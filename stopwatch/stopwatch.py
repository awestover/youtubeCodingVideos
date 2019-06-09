
import time
import os

ct = 0
while True:
    time.sleep(1)
    ct += 1
    os.system("printf '\r{} seconds elapsed'".format(ct))

