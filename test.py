# Rocket pattern
def draw_rocket():
    for i in range(5, 0, -1):
        print(" " * i + "/" + " " * (10 - i) + "\\")

    print("+----------+")
    print("|   ROCKET |")
    print("+----------+")

    for i in range(3):
        print("|          |")

    print("+----------+")

    for i in range(3):
        print("|          |")

    print("+----------+")

    for i in range(5):
        print(" " * i + "\\" + " " * (10 - i) + "/")


# Draw the rocket
draw_rocket()
