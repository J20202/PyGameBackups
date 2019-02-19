import pygame
import random


# Problems
'''
Problem: Pygame only test retangle collision, players are circles
Solution: Create hidden rectangle that follows player, that retangle follows collision
'''

pygame.init()
pygame.font.init()

# Variables

screen = pygame.display.set_mode((1200, 900))

clock = pygame.time.Clock()
scoreFont = pygame.font.SysFont('Comic Sans MS', 20)
done = False

tagDelay = 1000 #1000 = 1 second
nextTagAllowed = 1000

# Player attributes (x,y, color, speed, it, reversed, score, up, down, left, right, score)
redPlayer = [100,100, (255,0,0), 5, False, False, 0, pygame.K_w, pygame.K_s, pygame.K_a, pygame.K_d, 0]
greenPlayer = [300,300, (0,255,0), 5, False, False, 0, pygame.K_i, pygame.K_k, pygame.K_j, pygame.K_l, 0]
bluePlayer = [600,600, (0,0,255), 5, False, False, 0,  pygame.K_UP, pygame.K_DOWN, pygame.K_LEFT, pygame.K_RIGHT, 0]

# Maps
map1Background = [pygame.Rect(0, 0, 400, 900),
                  pygame.Rect(800, 0, 400, 900),
                  pygame.Rect(0, 0, 1200, 300),
                  pygame.Rect(0, 650, 1200, 400)]
map1Walls = [pygame.Rect(400, 300, 170, 35),
             pygame.Rect(400, 300, 35, 170),
             pygame.Rect(650, 300, 150, 35),
             pygame.Rect(765, 300, 35, 170),
             pygame.Rect(765, 550, 35, 100),
             pygame.Rect(400, 620, 400, 35),
             pygame.Rect(400, 550, 35, 100)]

#Definitions

def drawMap(mapBack, mapWalls):
    # Draw background
    for i in range(0,len(mapBack),1):
        pygame.draw.rect(screen, (0,0,0), mapBack[i], 0)

    # Draw walls
    for i in range(0,len(mapWalls),1):
        pygame.draw.rect(screen, (200,200,200), mapWalls[i], 0)


def checkForInput(player):
    oldx = player[0]
    oldy = player[1]

    pressed = pygame.key.get_pressed()
    if pressed[player[7]]:
        player[1] -=5
    if pressed[player[8]]:
        player[1] += 5
    if pressed[player[9]]:
        player[0] -=5
    if pressed[player[10]]:
        player[0] += 5

    # Check for collision
    collision = checkForCollision(player, map1Walls)
    if collision == True:
        player[0] = oldx
        player[1] = oldy

    # Keep players on screen
    playerOffScreen = isPlayerOffScreen(player)
    if playerOffScreen == True:
        player[0] = oldx
        player[1] = oldy

def checkForTag():
    global nextTagAllowed

    if pygame.time.get_ticks() > nextTagAllowed:
        redHitBox = pygame.Rect(redPlayer[0] - 17, redPlayer[1] - 17, 34, 34)
        greenHitBox = pygame.Rect(greenPlayer[0] - 17, greenPlayer[1] - 17, 34, 34)
        blueHitBox = pygame.Rect(bluePlayer[0] - 17, bluePlayer[1] - 17, 34, 34)

        if redPlayer[4] == True:
            if redHitBox.colliderect(greenHitBox):
                greenPlayer[4] = True
                redPlayer[4] = False
                nextTagAllowed = pygame.time.get_ticks() + tagDelay
            elif redHitBox.colliderect(blueHitBox):
                bluePlayer[4] = True
                redPlayer[4] = False
                nextTagAllowed = pygame.time.get_ticks() + tagDelay

        elif greenPlayer[4] == True:
            if greenHitBox.colliderect(redHitBox):
                redPlayer[4] = True
                greenPlayer[4] = False
                nextTagAllowed = pygame.time.get_ticks() + tagDelay
            elif greenHitBox.colliderect(blueHitBox):
                bluePlayer[4] = True
                greenPlayer[4] = False
                nextTagAllowed = pygame.time.get_ticks() + tagDelay

        elif bluePlayer[4] == True:
            if blueHitBox.colliderect(redHitBox):
                redPlayer[4] = True
                bluePlayer[4] = False
                nextTagAllowed = pygame.time.get_ticks() + tagDelay
            elif greenHitBox.colliderect(blueHitBox):
                greenPlayer[4] = True
                bluePlayer[4] = False
                nextTagAllowed = pygame.time.get_ticks() + tagDelay


def isPlayerOffScreen(player):
    if player[0] < 17:
        return True
    if player[0] > 1200-17:
        return True
    if player[1] < 17:
        return True
    if player[1] > 900-17:
        return True
    return False


def checkForCollision(player, mapWalls):
    hitBox = pygame.Rect(player[0]-17, player[1]-17, 34, 34)

    for i in range(0, len(mapWalls), 1):
        if hitBox.colliderect(mapWalls[i]):
            return True
    return False


def drawPlayer(player):
    if player[4] == False:
        pygame.draw.circle(screen,
                       player[2],
                       (player[0], player[1]),
                       17)
    else:
        pygame.draw.circle(screen,
                           (255,255,255),
                           (player[0], player[1]),
                           17)
    #pygame.draw.rect(screen, (150,150,150), pygame.Rect(player[0]-17, player[1]-17, 34, 34), 1)

def updateScore():
    if redPlayer[4] == True:
        redPlayer[11] += 1
    elif greenPlayer[4] == True:
        greenPlayer[11] += 1
    elif bluePlayer[4] == True:
        bluePlayer[11] += 1

def drawScore():
    textSurface = scoreFont.render("Red Score: " + str(redPlayer[11]),
                                    False,
                                    (255,0,0))
    screen.blit(textSurface, (10, 10))
    textSurface = scoreFont.render("Green Score: " + str(greenPlayer[11]),
                                    False,
                                    (0, 255, 0))
    screen.blit(textSurface, (580, 10))
    textSurface = scoreFont.render("Blue Score: " + str(bluePlayer[11]),
                                    False,
                                    (0, 0, 255))
    screen.blit(textSurface, (1000, 10))

whoIsIt = random.randint(0,2)
if whoIsIt == 0:
    redPlayer[4] = True
elif whoIsIt == 1:
    greenPlayer[4] = True
elif whoIsIt == 2:
    bluePlayer[4] = True





# Code Begans

while not done:

    clock.tick(60)

    for event in pygame.event.get():

        if event.type == pygame.QUIT:
            done = True

    checkForInput(redPlayer)
    checkForInput(greenPlayer)
    checkForInput(bluePlayer)

    checkForTag()
    updateScore()

    drawMap(map1Background, map1Walls)
    drawPlayer(redPlayer)
    drawPlayer(greenPlayer)
    drawPlayer(bluePlayer)
    drawScore()


    pygame.display.flip()
