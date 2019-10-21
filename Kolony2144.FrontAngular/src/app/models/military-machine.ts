export class MilitaryMachine {
  Id: number;
  Name: string;
  Damage: number;
  Health: number;
  Shield: number;
}
/*
in every phase A vs D then D vs A
ATTACKER ===> DEFENDER
LR vs LR
LR vs LR/MR
LR/MR vs LR/MR/SR
LR/MR/SR vs LR/MR/SR

GROUND UNITS JOINS
LR vs LR
LR vs LR/MR
LR/MR vs LR/MR/SR
LR/MR/SR vs LR/MR/SR
*/


/*
AIR MACHINES
  LR  AArockets     -0      need radar 10 salvo   ---HIGHSPEED
  MR  lightfighters      -1xpilot
  MR  fighters      -1xpilot
  MR  bombers       -2xpilot
  MR  heavybombers       -4xpilot
  MR  drones        -0      need radar 10 per

GROUND MACHINES
  LR  rocket launcher -2soldier 1 officer
  LR  lead rocketLRlauncher     -2soldiers 2xofficer, bonus to 5 artilery
  LR  artillery     -4soldiers
  LR  lead artillery     -2soldiers 2xofficer, bonus to 5 tanks
  LR  GGturretrockets     -0

  MR  minefield     -0 def only
  MR  MRlight tank    -2 soldiers
  MR  medium tank   -2 soldiers 1officer
  MR  heavy tanks   -4soldiers 1xofficer
  MR  lead tank     -3soldiers 1xofficer, bonus to 5 tanks
  MR  GGturretsschockwave -2s 1o
  MR  GGturretslaser -2s 1o
  MR  lightmech
  MR  mediumDEFmech
  MR  mediumOFmech
  MR  heavymech


  SR  exoskeleton
  SR  APC           -9s 1o bonus to 10 soldiers
  SR  wall          -0 def only
  SR  GGturretsmachinegun -2s
  SR  GGturretsFlamethrower -2s
  SR  GGturretsheavylaser -2s 1o




BUILDINGS:
   SR AAturrets     -2soldier


BUFFS
   LR radar station -10soldiers 2officer - bonus to 5 AAturrets 5 ggturrets 5artillery 5rocketlauncher 5lead tanks
   MR awacs         -5pilot -bonus to 5x fig/dron/bomb/rocket
   MR jammers       -1o freezes 10 airunits
   LR HQ            -1general 10 officers 10soldiers - bonus all officers and radar






   MILITARY MODEL:
UNI:
    id
    name
    description
    type - air ground space
    size  int
    health int
    armor int
    shield  int
    initiative  int
    range int
    attackDMG int
    defenseDMG  int

  CREW:
    salary  int
    exp/rank  1+ exponetial growt with battles survived - float

  GEAR:
    resources cost  int
    fuel consupmption int

  BUILDINGS:
    resources cost  int
    power consumption int





SPACE UNITS
  SHIPS:
    mounting1 slots and size
    mounting2 slots and size
    mounting3 slots and size
    mounted gears/turets
    capacity
    crew1deg
    crew2deg
    crew3deg
    cargo


CARGO FINITE AMMO:
    AArockets
    AGrockets
    torpedoes
    nukePod
    ICBM only on stations

CARGO INIFINITE AMMO:
    bombingPod
    SSRailgun -2s
    SSturretsschockwave -2s 1o
    SSturretslaser -2s 1o
    SSturretsheavylaser -2s 1o
    SSturretsmachinegun -2s

  LONG RANGE
    carrier carries air units   -1g
    battleship    -1g
    rocket frigate - carry rocket bonus
    patrol

  MID RANGE
    cruiser
    frigate
    torpedo frigate   - carry torpedo bonus
    destroyer


  SHORT RANGE
    space minefield
    space station defense
    landingpod  carries ground units

  BUFFS
    spaceawacs
    space station radar
*/
