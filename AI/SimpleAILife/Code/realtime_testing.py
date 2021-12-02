from modules import *
from MP_holistic_styled_landmarks import mp_holistic,draw_styled_landmarks
from mediapipe_detection import mediapipe_detection
from keypoints_extraction import extract_keypoints
import keras
from folder_setup import *
from visualization import prob_viz,colors
# from Streaming.streamer import Streamer
import pafy

sequence = []
sentence = []
threshold = 0.8

model = keras.models.load_model('Model/lstm_model_pls_work.h5')
url = "https://www.youtube.com/watch?v=aKX8uaoy9c8"
videoPafy = pafy.new(url)
best = videoPafy.getbest(preftype = "webm")
cap = cv2.VideoCapture(best.url)

with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    while True:
        
        ret, frame = cap.read()
        print(f"ret: {ret} frame: {frame}")
        # print(frame.to_dict())
        
        image, results = mediapipe_detection(frame, holistic)
        # print(results)
        draw_styled_landmarks(image, results)

        keypoints = extract_keypoints(results)
        sequence.append(keypoints)
        sequence = sequence[-20:]
        # print("len is ", len(sequence))
        if len(sequence) == 20:
            res = model.predict(np.expand_dims(sequence, axis=0))[0]
            # print(r)
            print(actions[np.argmax(res)])
            # print(threshold)
            # print(threshold<np.argmax(res))
            if res[np.argmax(res)] > threshold: 
                if len(sentence) > 0: 
                    if actions[np.argmax(res)] != sentence[-1]:
                        sentence.append(actions[np.argmax(res)])
                else:
                    sentence.append(actions[np.argmax(res)])

            if len(sentence) > 5: 
                sentence = sentence[-5:]


            image = prob_viz(res, actions, image, colors)
            
        cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
        cv2.putText(image, ' '.join(sentence), (3,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
        

        cv2.imshow('Action_Recognition', image)


        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()   