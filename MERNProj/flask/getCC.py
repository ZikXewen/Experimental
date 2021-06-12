# venv\Scripts\activate.bat
# pip install transformers
# pip install librosa
# pip install torch
from librosa import load
from torch import argmax
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import sys

sys.stdout.reconfigure(encoding='utf-8')

processor = Wav2Vec2Processor.from_pretrained("sakares/wav2vec2-large-xlsr-thai-demo")
model = Wav2Vec2ForCTC.from_pretrained("sakares/wav2vec2-large-xlsr-thai-demo")

audio, rate = load(sys.argv[1], sr = 16000)
input_values = processor(audio, return_tensors="pt", sampling_rate=16000).input_values
logits = model(input_values).logits
prediction = argmax(logits, dim = -1)
transcription = processor.batch_decode(prediction)[0]
print(transcription)