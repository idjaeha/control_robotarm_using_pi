import RPi.GPIO as GPIO  
from time import sleep

pins = [11, 13, 15, 12, 16, 18]
duty_cycles = [7 for _ in range(6)]
motors = []
GPIO.setmode(GPIO.BOARD)

# setup
def setup():
    for idx, pin in enumerate(pins):
        GPIO.setup(pin, GPIO.OUT)
        motor = GPIO.PWM(pin, 50)
        motor.start(0)
        motor.ChangeDutyCycle(duty_cycles[idx])
        motors.append(motor)

# run
def run():
    print("ex ) 0 1 2 4")
    cmd = list(map(int, input("select motor (0~5) : ").split()))
    if cmd[0] <= -1:
        return False

    print("ex ) 3 6 5 4")
    val = list(map(int, input("input power (3~12) : ").split()))
    if val[0] <= -1 :
        return False
    
    for idx in range(len(cmd)):
        motors[cmd[idx]].ChangeDutyCycle(val[idx])
        print("{} : {}".format(motors[cmd[idx]], val[idx]))
    return True

# unlock
def unlock():
    for motor in motors:
        motor.stop()
    GPIO.cleanup()

# mainflow
def mainflow():
    setup()
    flag = True
    while flag:
        flag = run()
    unlock()

if __name__ == '__main__':
    mainflow()