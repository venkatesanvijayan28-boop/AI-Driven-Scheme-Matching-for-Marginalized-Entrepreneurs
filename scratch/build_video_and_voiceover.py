import asyncio
import os
import subprocess
import wave
import imageio_ffmpeg
import numpy as np

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
os.makedirs('scratch/vo_segments', exist_ok=True)

# Narration script segments mapped to the 120-second (2 minute) timeline
SEGMENTS = [
    {
        "start": 0.5,
        "text": "Welcome to SchemeMatch AI — an intelligent platform bridging the gap between concessional credit schemes and citizens.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 8.5,
        "text": "Under government guidelines, Scheduled Caste beneficiaries are eligible for up to 90% concessional credit. Our portal provides 1-click persona access and secure authentication.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 18.5,
        "text": "On the Entrepreneur Dashboard, our Dynamic Financial Forecaster calculates subsidized EMIs, factoring in NSFDC concessional rates, 90% project coverage, and 3 to 12 month moratorium grace periods.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 32.5,
        "text": "The Entrepreneur Profile system captures demographic, business stage, and capital requirements, aligning applicants with suitable funding tiers.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 48.0,
        "text": "Our AI Scheme Matching Engine delivers transparent, explainable match scoring across sector, location, and affirmative action criteria, uncovering up to 35% capital subsidies.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 63.5,
        "text": "With integrated AI Investor Matching, early-stage enterprises connect with verified Indian angel networks, seed platforms, and venture syndicates.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 76.5,
        "text": "Entrepreneurs can interact directly with our AI Scheme Advisor powered by Google Gemini 3.6 Flash, supporting multi-language queries and voice speech.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 88.5,
        "text": "The platform supports seamless user onboarding with profile validation and instant password recovery.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 98.0,
        "text": "For policymakers, the Admin Console provides real-time oversight of national impact, tracking ₹48.6 Crores in unlocked subsidies and managing Central and State welfare schemes like NSFDC and PMEGP.",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    },
    {
        "start": 113.0,
        "text": "SchemeMatch AI: Empowering grassroots entrepreneurship through transparent digital financing. Thank you!",
        "voice": "en-IN-PrabhatNeural",
        "rate": "+6%"
    }
]

async def generate_speech():
    import edge_tts
    print("=== Step 1: Synthesizing AI Voiceover Segments ===")
    for idx, seg in enumerate(SEGMENTS):
        mp3_path = f"scratch/vo_segments/seg_{idx:02d}.mp3"
        wav_path = f"scratch/vo_segments/seg_{idx:02d}.wav"
        print(f"[{idx+1}/{len(SEGMENTS)}] Generating speech at {seg['start']}s: {seg['text'][:45]}...")
        comm = edge_tts.Communicate(seg['text'], seg['voice'], rate=seg['rate'])
        await comm.save(mp3_path)
        # Convert to 44100Hz 16-bit stereo WAV
        subprocess.run([
            FFMPEG, '-y', '-i', mp3_path,
            '-ar', '44100', '-ac', '2', wav_path
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def build_full_audio(total_duration=120.0):
    print("=== Step 2: Mixing Audio onto 120.0s Timeline ===")
    sample_rate = 44100
    total_samples = int(total_duration * sample_rate)
    audio_data = np.zeros((total_samples, 2), dtype=np.int16)

    for idx, seg in enumerate(SEGMENTS):
        wav_path = f"scratch/vo_segments/seg_{idx:02d}.wav"
        with wave.open(wav_path, 'r') as w:
            n_frames = w.getnframes()
            frames = w.readframes(n_frames)
            seg_data = np.frombuffer(frames, dtype=np.int16).reshape(-1, 2)
            
            start_sample = int(seg['start'] * sample_rate)
            end_sample = min(total_samples, start_sample + len(seg_data))
            seg_len = end_sample - start_sample
            
            # Place audio segment
            audio_data[start_sample:end_sample] = seg_data[:seg_len]
            dur_sec = n_frames / float(sample_rate)
            print(f"Placed segment {idx+1} ({dur_sec:.2f}s) at {seg['start']:.1f}s -> {seg['start']+dur_sec:.1f}s")

    full_wav_path = "scratch/full_voiceover.wav"
    with wave.open(full_wav_path, 'w') as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(sample_rate)
        out.writeframes(audio_data.tobytes())
    print(f"Saved full voiceover track: {full_wav_path}")
    return full_wav_path

def render_video(full_wav_path, target_duration=120.0):
    print("=== Step 3: Speed-compressing Video to 2:00 & Merging Audio ===")
    # Calculate exact PTS factor
    # Original duration = 209.533333 seconds
    orig_duration = 209.533333
    pts_factor = target_duration / orig_duration
    print(f"Original duration: {orig_duration:.2f}s -> Target duration: {target_duration:.2f}s (PTS factor: {pts_factor:.6f})")

    output_video_vo = "sih_2min_voiceover.mp4"
    output_video_silent = "sih_2min_silent.mp4"

    # 1. Render Video with Voiceover
    cmd_vo = [
        FFMPEG, '-y',
        '-i', 'sih.mp4',
        '-i', full_wav_path,
        '-filter:v', f'setpts={pts_factor:.6f}*PTS',
        '-map', '0:v:0',
        '-map', '1:a:0',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '20',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-t', str(target_duration),
        output_video_vo
    ]
    print(f"Rendering: {output_video_vo}...")
    subprocess.run(cmd_vo, check=True)
    print(f"✅ Successfully created {output_video_vo} ({os.path.getsize(output_video_vo)/(1024*1024):.2f} MB)")

    # 2. Render 2-minute Silent Video (in case user wants clean video for manual voice recording)
    cmd_silent = [
        FFMPEG, '-y',
        '-i', 'sih.mp4',
        '-filter:v', f'setpts={pts_factor:.6f}*PTS',
        '-an',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '20',
        '-pix_fmt', 'yuv420p',
        '-t', str(target_duration),
        output_video_silent
    ]
    print(f"Rendering: {output_video_silent}...")
    subprocess.run(cmd_silent, check=True)
    print(f"✅ Successfully created {output_video_silent} ({os.path.getsize(output_video_silent)/(1024*1024):.2f} MB)")

if __name__ == '__main__':
    asyncio.run(generate_speech())
    wav_path = build_full_audio(120.0)
    render_video(wav_path, 120.0)
    print("\n🎉 ALL DONE! Videos rendered successfully in project folder!")
