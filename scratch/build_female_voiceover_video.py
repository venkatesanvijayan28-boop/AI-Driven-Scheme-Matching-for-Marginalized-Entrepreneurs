import asyncio
import os
import subprocess
import wave
import imageio_ffmpeg
import numpy as np

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
os.makedirs('scratch/female_vo_segments', exist_ok=True)

# Target duration: exactly 165.0 seconds (2 minutes 45 seconds - well under 3 minutes, comfortable 1.27x pace)
TARGET_DURATION = 165.0
ORIG_DURATION = 209.533333
PTS_FACTOR = TARGET_DURATION / ORIG_DURATION # ~0.787464

# Exactly mapped segments corresponding to what is visible on screen
SEGMENTS = [
    {
        "start": 0.5,
        "text": "Starting up SchemeMatch AI — an intelligent national platform connecting entrepreneurs with government credit and subsidy schemes.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 6.5,
        "text": "New entrepreneurs can easily register with Aadhaar-linked mobile verification, district location mapping, and multi-language preferences.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 16.5,
        "text": "The portal offers seamless authentication, as well as one-click access to diverse entrepreneur personas.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 24.0,
        "text": "On the Dashboard, our Dynamic Financial Forecaster calculates subsidized EMIs, featuring NSFDC concessional rates, ninety percent project coverage, and three to twelve month moratorium grace periods.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 42.0,
        "text": "In the Profile section, entrepreneurs configure business turnover, capital requirements, and investment tiers, directly feeding our AI matching engine.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 57.0,
        "text": "Our AI Scheme Matching Engine delivers transparent, explainable match scoring across sector, location, funding fit, and affirmative action priority.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 71.5,
        "text": "The interactive Roadmap guides applicants step-by-step through the seven-stage lifecycle, from documentation to bank appraisal and disbursement.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 85.5,
        "text": "Each scheme detail page provides complete financial clarity, including subsidy slabs, promoter margin requirements, and voice-assisted audio guidance.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 99.5,
        "text": "Through AI Investor Matching, enterprises can connect directly with verified Indian angel networks and seed platforms tailored to their stage and sector.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 113.5,
        "text": "The Document Hub verifies mandatory compliance records like Aadhaar, category certificates, and bank statements, ensuring zero submission rejections.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 132.5,
        "text": "Administrators log in securely with multi-factor credentials and real-time password visibility controls.",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    },
    {
        "start": 146.0,
        "text": "The Admin Console provides centralized governance, monitoring forty-eight point six Crore Rupees in unlocked subsidies and managing concessional schemes across India. SchemeMatch AI: Empowering every entrepreneur. Thank you!",
        "voice": "en-IN-NeerjaNeural",
        "rate": "+2%"
    }
]

async def generate_speech():
    import edge_tts
    print("[1/3] Generating Female Voiceover (en-IN-NeerjaNeural)...")
    for idx, seg in enumerate(SEGMENTS):
        mp3_path = f"scratch/female_vo_segments/seg_{idx:02d}.mp3"
        wav_path = f"scratch/female_vo_segments/seg_{idx:02d}.wav"
        print(f"  Segment {idx+1}/{len(SEGMENTS)} at {seg['start']}s...")
        comm = edge_tts.Communicate(seg['text'], seg['voice'], rate=seg['rate'])
        await comm.save(mp3_path)
        subprocess.run([
            FFMPEG, '-y', '-i', mp3_path,
            '-ar', '44100', '-ac', '2', wav_path
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def mix_audio_track():
    print("[2/3] Mixing Audio Track on 165.0s Timeline...")
    sample_rate = 44100
    total_samples = int(TARGET_DURATION * sample_rate)
    audio_data = np.zeros((total_samples, 2), dtype=np.int16)

    for idx, seg in enumerate(SEGMENTS):
        wav_path = f"scratch/female_vo_segments/seg_{idx:02d}.wav"
        with wave.open(wav_path, 'r') as w:
            n_frames = w.getnframes()
            frames = w.readframes(n_frames)
            seg_data = np.frombuffer(frames, dtype=np.int16).reshape(-1, 2)
            
            start_sample = int(seg['start'] * sample_rate)
            end_sample = min(total_samples, start_sample + len(seg_data))
            seg_len = end_sample - start_sample
            audio_data[start_sample:end_sample] = seg_data[:seg_len]
            dur_sec = n_frames / float(sample_rate)
            print(f"  Segment {idx+1}: {seg['start']:.1f}s -> {seg['start']+dur_sec:.1f}s ({dur_sec:.2f}s)")

    full_wav_path = "scratch/female_voiceover_165s.wav"
    with wave.open(full_wav_path, 'w') as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(sample_rate)
        out.writeframes(audio_data.tobytes())
    return full_wav_path

def render_final_videos(wav_path):
    print("[3/3] Rendering Video with Smooth 1.27x Pacing & Merging Audio...")
    out_vo = "sih_presentation_female.mp4"
    out_silent = "sih_presentation_silent.mp4"

    # Render with Female Voiceover
    cmd_vo = [
        FFMPEG, '-y',
        '-i', 'sih.mp4',
        '-i', wav_path,
        '-filter:v', f'setpts={PTS_FACTOR:.6f}*PTS',
        '-map', '0:v:0',
        '-map', '1:a:0',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '20',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-t', str(TARGET_DURATION),
        out_vo
    ]
    subprocess.run(cmd_vo, check=True)
    print(f"Done: {out_vo} created ({os.path.getsize(out_vo)/(1024*1024):.2f} MB)")

    # Render Silent version
    cmd_silent = [
        FFMPEG, '-y',
        '-i', 'sih.mp4',
        '-filter:v', f'setpts={PTS_FACTOR:.6f}*PTS',
        '-an',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '20',
        '-pix_fmt', 'yuv420p',
        '-t', str(TARGET_DURATION),
        out_silent
    ]
    subprocess.run(cmd_silent, check=True)
    print(f"Done: {out_silent} created ({os.path.getsize(out_silent)/(1024*1024):.2f} MB)")

if __name__ == '__main__':
    asyncio.run(generate_speech())
    wav = mix_audio_track()
    render_final_videos(wav)
    print("SUCCESS: All video and female voiceover renders completed!")
