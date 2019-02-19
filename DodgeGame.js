import pygame #needed to import the pygame framework
import random #needed to generate random numbers

#initializes all the modules required for PyGame
pygame.init()
pygame.font.init()

#launch a window of the desired size, screen equals a Surface which is an object
#we can perform graphical operations on. Think of a Surface as a blank piece of paper
screen = pygame.display.set_mode((800, 600))

#variable to control the game loop, keeps our code running until we flip it to True
done = False
gameStatus = "playing"
finalScore = 0

#player variables
x = 400
y = 300
size = 15
speed = 7
color = (255,255,255)
bomb = False

# list of enemies that move down, right, up
downEnemies = []
rightEnemies = []
upEnemies = []
leftEnemies = []
innerPathEnemies = []
outerPathEnemies = []
enemyTimer = 0
eSpeed = 2

#timer for the game
timer = pygame.time.get_ticks()
lastRestartTime = 0
myFont = pygame.font.SysFont('Comic Sans MS', 30)
clock = pygame.time.Clock()

def handlePlayerInput():
    global x #because I want to CHANGE x
    global y #because I want to CHANGE y
    global bomb
    global size

    size += .01

    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_TAB:
            if bomb == False:
                bomb = True
                clearEnemies()
                initEnemies()

    pressed = pygame.key.get_pressed()
    if pressed[pygame.K_d]:
        x += speed
        if x > 785:
            x = 785
    if pressed[pygame.K_a]:
        x -= speed
        if x < 0:
            x = 0
    if pressed[pygame.K_w]:
        y -= speed
        if y < 0:
            y = 0
    if pressed[pygame.K_s]:
        y += speed
        if y > 585:
            y = 585

def draw():
    #clear screen
    pygame.draw.rect(screen, (0,0,0), pygame.Rect(0,0,800,600),0)

    #draw the player
    pygame.draw.rect(screen, color, pygame.Rect(x,y,size,size), 0)

    #draw the enemies
    drawEnemies()

    #draw the time
    textSurface = myFont.render("Time " + str((pygame.time.get_ticks()-lastRestartTime)/1000), False, (255,255,255))
    screen.blit(textSurface, (367, 10))

def initEnemies():
    global downEnemies
    global rightEnemies

    downEnemies.append(pygame.Rect(200, -50, 20, 20))
    downEnemies.append(pygame.Rect(400, -50, 20, 20))

    rightEnemies.append(pygame.Rect(-50, 300, 20, 20))
    rightEnemies.append(pygame.Rect(-50, 100, 20, 20))

    upEnemies.append(pygame.Rect(100, 700, 20, 20))
    upEnemies.append(pygame.Rect(300, 700, 20, 20))

    leftEnemies.append(pygame.Rect(850, 100, 20, 20))
    leftEnemies.append(pygame.Rect(850, 400, 20, 20))

    innerPathEnemies.append(pygame.Rect(100, 100, 20, 20))

    outerPathEnemies.append(pygame.Rect(0, 0, 20, 20))


def drawEnemies():
    #for every enemy in the list downEnemies
    for enemy in downEnemies:
        pygame.draw.rect(screen, (255,0,0), enemy)

    # for every enemy in the list rightEnemies
    for enemy in rightEnemies:
        pygame.draw.rect(screen, (0, 255, 0), enemy)

    # for every enemy in the list upEnemies
    for enemy in upEnemies:
        pygame.draw.rect(screen, (0, 255, 255), enemy)

    # for every enemy in the list leftEnemies
    for enemy in leftEnemies:
        pygame.draw.rect(screen, (255, 0, 255), enemy)

    for enemy in innerPathEnemies:
        pygame.draw.rect(screen, (255, 255, 0), enemy)

    for enemy in outerPathEnemies:
        pygame.draw.rect(screen, (0, 0, 255), enemy)

def clearEnemies():
    global upEnemies
    global downEnemies
    global rightEnemies
    global leftEnemies
    global innerPathEnemies
    global outerPathEnemies
    upEnemies = []
    downEnemies = []
    rightEnemies = []
    leftEnemies = []
    innerPathEnemies = []
    outerPathEnemies = []

def resetGame():
    global lastRestartTime
    global enemyTimer
    global bomb
    global x
    global y
    global size
    global eSpeed

    x = 400
    y = 300
    size = 15
    eSpeed = 2

    bomb = False
    clearEnemies()
    initEnemies()
    #time stamp the restart
    lastRestartTime = pygame.time.get_ticks()
    enemyTimer = 0


def checkCollisions():
    global upEnemies
    global downEnemies
    global rightEnemies
    global leftEnemies
    global innerPathEnemies
    global outerPathEnemies
    global gameStatus
    global finalScore

    for enemy in downEnemies:
        if enemy.colliderect(pygame.Rect(x,y,size,size)):
            gameStatus = "gameover"
            finalScore = pygame.time.get_ticks() - lastRestartTime
    for enemy in upEnemies:
        if enemy.colliderect(pygame.Rect(x,y,size,size)):
            gameStatus = "gameover"
            finalScore = pygame.time.get_ticks() - lastRestartTime
    for enemy in leftEnemies:
        if enemy.colliderect(pygame.Rect(x,y,size,size)):
            gameStatus = "gameover"
            finalScore = pygame.time.get_ticks() - lastRestartTime
    for enemy in rightEnemies:
        if enemy.colliderect(pygame.Rect(x,y,size,size)):
            gameStatus = "gameover"
            finalScore = pygame.time.get_ticks() - lastRestartTime
    for enemy in innerPathEnemies:
        if enemy.colliderect(pygame.Rect(x,y,size,size)):
            gameStatus = "gameover"
            finalScore = pygame.time.get_ticks() - lastRestartTime
    for enemy in outerPathEnemies:
        if enemy.colliderect(pygame.Rect(x,y,size,size)):
            gameStatus = "gameover"
            finalScore = pygame.time.get_ticks() - lastRestartTime

def drawGameOver():
    # clear screen
    pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600), 0)

    # draw the game over
    textSurface = myFont.render("Game Over", False, (255, 255, 255))
    screen.blit(textSurface, (355, 10))

    # draw the final score
    textSurface = myFont.render("Final Score: " + str(finalScore), False, (255, 255, 255))
    screen.blit(textSurface, (310, 200))

    # draw continue code
    textSurface = myFont.render("Press Spacebar to play again", False, (255, 255, 255))
    screen.blit(textSurface, (250, 400))


def moveEnemies():
    global eSpeed

    eSpeed += .005
    print eSpeed

    for enemy in downEnemies:
        enemy.y += eSpeed
        #if the enemy goes off the screen
        if enemy.y > 600:
            enemy.y = -50 #reset it up top
            enemy.x = random.randint(0,780) #random x value

    for enemy in rightEnemies:
        enemy.x += eSpeed +1
        #if the enemy goes off the screen
        if enemy.x > 800:
            enemy.x = -50 #reset it up top
            enemy.y = random.randint(0,580) #random x value

    for enemy in upEnemies:
        enemy.y -= eSpeed + 3
        #if the enemy goes off the screen
        if enemy.y < -20:
            enemy.x = random.randint(0,780) #reset it up top
            enemy.y = 650 #random x value

    for enemy in leftEnemies:
        enemy.x -= eSpeed
        #if the enemy goes off the screen
        if enemy.x < -20:
            enemy.x = 850
            enemy.y = random.randint(0,550) #random y value

    for enemy in innerPathEnemies:
        if enemy.x >= 100 and enemy.x <= 680 and enemy.y == 100:
            enemy.x += 2
        if enemy.y >=100 and enemy.y <=480 and enemy.x == 680:
            enemy.y += 2
        if enemy.x >= 100 and enemy.x <= 680 and enemy.y == 480:
            enemy.x -= 2
        if enemy.y >=100 and enemy.y <=480 and enemy.x == 100:
            enemy.y -= 2
    for enemy in outerPathEnemies:
        if enemy.x >= 0 and enemy.x <= 780 and enemy.y == 0:
            enemy.x += 5
        if enemy.y >= 0 and enemy.y <=580 and enemy.x == 780:
            enemy.y += 5
        if enemy.x >= 0 and enemy.x <= 780 and enemy.y == 580:
            enemy.x -= 5
        if enemy.y >= 0 and enemy.y <= 580 and enemy.x == 0:
            enemy.y -= 5


def addEnemy():
    global enemyTimer
    enemyNumber = random.randint(1,6)


    enemyTimer += 1

    if enemyTimer > 10*60:
            if enemyNumber == 1:
                downEnemies.append(pygame.Rect(200, -50, 20, 20))
            elif enemyNumber == 2:
                rightEnemies.append(pygame.Rect(-50, 300, 20, 20))
            elif enemyNumber == 3:
                upEnemies.append(pygame.Rect(100, 700, 20, 20))
            elif enemyNumber == 4:
                leftEnemies.append(pygame.Rect(850, 100, 20, 20))
            elif enemyNumber == 5:
                innerPathEnemies.append(pygame.Rect(100, 100, 20, 20))
            elif enemyNumber == 6:
                outerPathEnemies.append(pygame.Rect(0, 0, 20, 20))
            enemyTimer = 0


# code to set everything up BEFORE the game starts
initEnemies()

#continually run the game loop until done is switch to True
while not done:

    # set the game to 60 FPS
    clock.tick(60)

    #loop through and empty the event queue, key presses, button clicks, etc.
    for event in pygame.event.get():

        #if the event is a click on the "X" close button
        if event.type == pygame.QUIT:
            done = True
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                if gameStatus == "gameover":
                    resetGame()
                    gameStatus = "playing"


    if gameStatus == "playing":
        handlePlayerInput()
        moveEnemies()
        checkCollisions()
        draw()
        addEnemy()
    elif gameStatus == "gameover":
        drawGameOver()

    #Show any graphical updates you have made to the screen
    pygame.display.flip()
