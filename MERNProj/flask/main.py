from flask import Flask, request
from librosa import load
from torch import argmax
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import tempfile
import base64
import os
app = Flask(__name__)

processor = Wav2Vec2Processor.from_pretrained("sakares/wav2vec2-large-xlsr-thai-demo")
model = Wav2Vec2ForCTC.from_pretrained("sakares/wav2vec2-large-xlsr-thai-demo")

tempfile.tempdir = os.path.dirname(os.path.abspath(__file__))

@app.route('/', methods=['GET'])
def index():
    return {
        'name': 'Hello World'
    }

@app.route('/', methods=['POST'])
def getTranscription():
    data = request.json['testString']
    tempFile = tempfile.NamedTemporaryFile(mode='wb+', suffix=".wav", delete=False)
    tempFile.write(base64.urlsafe_b64decode(data))
    tempFile.close()
    
    audio, rate = load(tempFile.name, sr = 16000)
    input_values = processor(audio, return_tensors="pt").input_values
    logits = model(input_values).logits
    prediction = argmax(logits, dim = -1)
    transcription = processor.batch_decode(prediction)[0]

    os.remove(tempFile.name)
    return transcription.translate(str.maketrans({' ': None}))


if(__name__ == '__main__'):
    app.run(debug=True, port=5001) # CHANGE PORT LATER