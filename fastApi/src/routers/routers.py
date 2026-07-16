from fastapi import APIRouter
from fastapi import UploadFile, File
from scipy.io import wavfile
from io import BytesIO
from app.predict.judgeShimaenaga import judgeShimaenaga


router = APIRouter(
    prefix="/fft",
    tags=["fft"]
)

@router.get("/health")
def health_check():
    return {
        "status": "ok"
    }

@router.post("/fft/send-wave")
async def upload_audio(
    audio_file: UploadFile = File(...)
):
    wav = await audio_file.read()
    sample_rate, signal = wavfile.read(
        BytesIO(wav)
    )
    if signal.ndim > 1:
        signal = signal[:, 0]

    times = [
        i / sample_rate
        for i in range(len(signal))
    ]

    return {
    "message": "FFT-send success",
    "time": times[:5000],
    "amplitude": signal[:5000].tolist()
    }

@router.post("/fft/spectrum")
async def upload_audio(
    audio_file: UploadFile = File(...)
):
    wav = await audio_file.read()
    sample_rate, signal = wavfile.read(
        BytesIO(wav)
    )

    if signal.ndim > 1:
        signal = signal[:, 0]

    freqs, amp = spectrum(signal,sample_rate)

    print(type(freqs))
    print(type(amp)) 

    return {
    "message": "spectrumChart success",
    "frequency": freqs[:5000].tolist(),
    "amplitude": amp[:5000].tolist()
    }
