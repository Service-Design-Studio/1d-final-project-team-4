from modules import *


DATA_PATH = os.path.join('Feature_Extraction') 

# actions = np.array(['hello', 'thanks', 'iloveyou'])
actions = np.array(['went'])

number_sequences = 20
sequence_length = 30

for action in actions: 
    for sequence in range(number_sequences):
        try: 
            os.makedirs(os.path.join(DATA_PATH, action, str(sequence)))
        except:
            pass