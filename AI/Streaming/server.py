from flask import Flask, render_template, Response
from streamer import Streamer

app = Flask(__name__)

def gen():
  streamer = Streamer('localhost', 8000)
  streamer.start()

  while True:
    if streamer.streaming:
      yield (streamer.get_jpeg())

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/video_feed')
def video_feed():
  return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
  app.run(host='localhost', threaded=True)
