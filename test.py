"""Simple test for a standard servo on channel 0 and a continuous rotation servo on channel 1."""
import time
from adafruit_servokit import ServoKit
 
# Set channels to the number of servo channels on your kit.
# 8 for FeatherWing, 16 for Shield/HAT/Bonnet.
kit = ServoKit(channels=8)

for i in range(6):
    kit.servo[i].angle = 180
    time.sleep(1)
    kit.servo[i].angle = 0
    time.sleep(1)