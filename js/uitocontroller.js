/*
COMMANDS:
00h	0	[reserved]
01h	1	[reserved]
02h	2	Save User Settings
03h	3	[reserved]
04h	4	Set all LED indicators
05h	5	Recall User Settings
06h	6	Factory Reset
07h	7	Request	multiple subtypes)
07 04h	7 4	Request all LED indicators
07 05h	7 5	[reserved]
07 06h	7 6	Request Control Surface Snapshot
07 07h	7 7	[reserved]
07 08h	7 8	Request Local Control (btn_tog,btn_mom,enc_abs,enc_cc,analog_fsr,analog_pot)
07 09h	7 9	Request Single MIDI Input mapping
07 0Ah	7 10	Request Analog mapping
07 0Bh	7 11	Request Button mapping
07 0Ch	7 12	Request MIDI Basic Channel
07 0Dh	7 13	Request MIDI Output Merge setting
07 0Eh	7 14	[reserved]
07 0Fh	7 15	Request Controller options (like xfade flip, omni and merge)
07 10h	7 16	Request Encoders
07 11h	7 17	Request Encosion Style
07 12h	7 18	Request Analog Channel Map
07 13h	7 19	Request Button Channel Map
07 14h	7 20	Request Encoder Channel Map
07 15h	7 21	(reserved - Request LED Channel Map)
07 16h	7 22	Request Bank Channel
07 17h	7 23	Request Bank Channels
07 18h	7 24	[reserved]
07 19h	7 25	[reserved]
07 1Ah	7 26	Request Current Bank
07 1Bh	7 27	Request Button Map Pt. 02
07 1Ch	7 28	[reserved]
07 1Dh	7 29	Request Ring Mode
07 1Eh	7 30	Request Encoder Speed
07 1Fh	7 31	Request LED ring indicators
07 20h	7 32	Request LED ring local control
07 21h	7 33	Request Expansion Jack map
07 22h	7 34	Request Color Scheme
07 23h	7 35	Request LED Maps Notes 
07 24h	7 36	Request LED Maps CCs 
07 25h	7 37	Request LEDs All Banks 
07 26h	7 38	Request Encoder Values 
07 27h	7 39	Request Encoder Values All Banks
07 28h	7 40	Request Is Encoder
07 29h	7 41	Request Analog Filter Mode
07 2Ah	7 42	Request LED Last Column 
07 2Bh	7 43	Request Encoder Value Flip 
07 2Ch	7 44	Request Analog Value Flip 
07 2Dh	7 45	Request Analog Disable 
07 2Eh	7 46	Request LED Group 
07 2Fh	7 47	Request Encoder LED Local Control
07 30h	7 48	Request Analog LED Local Control 
07 31h	7 49	Request Analog Note Assignment 
07 32h	7 50	Request LED Ring Style 
07 33h	7 51	Request LED Note Map Pt. 02 
07 34h	7 52	Request LED CC Map Pt. 02 
07 35h	7 53	Request Control Channels	buttons ch / encoders ch / leds ch / analog cc ch / analog note ch)
07 36h	7 54	Request Button Toggle Mode Enable.
08h	8	Local Control Response
09h	9	Map Single LED Indicator
0Ah	10	Map Analog Inputs
0Bh	11	Map Buttons
0Ch	12	Set MIDI Settings Channel
0Dh	13	Set MIDI Output Merge
0Eh	14	Erase entire MIDI Input Map
0Fh	15	Request Controller options (like xfade flip, omni, and merge)
10h	16	Encoder MIDI mapping
11h	17	Encosion Style mapping
12h	18	(reserved - Analog Channel Map)
13h	19	(reserved - Button Channel Map)
14h	20	(reserved - Encoder Channel Map)
15h	21	(reserved - LED Channel Map)
16h	22	Set Bank Channel
17h	23	Set All Bank Channels
18h	24	Save Current Bank Settings
19h	25	Save All Bank Settings
1Ah	26	Current Bank Number
1Bh	27	Button Map part 2
1Ch	28	Restore Current Bank
1Dh	29	Set Ring Mode	all encoders)
1Eh	30	Set Encoder Speed - 1-15 is fast, 66-79 is slow
1Fh	31	Set LED Ring indicators
20h	32	Local Ring Control
21h	33	Map Expansion Analog Inputs
22h	34	Map Color Scheme
23h	35	LED Note Map 
24h	36	LED CC Map
25h	37	LEDs All Banks 
26h	38	Encoder Values 
27h	39	Encoder Values All Banks
28h	40	Is Encoder
29h	41	Analog Filter Mode
2Ah	42	LED Last Column
2Bh	43	Encoder Value Flip
2Ch	44	Analog Value Flip
2Dh	45	Analog Disable
2Eh	46	LED Group
2Fh	47	Encoder LED Local Control
30h	48	Analog LED Local Control
31h	49	Analog Note Assignment
32h	50	LED Ring Style
33h	51	LED Note Map Pt. 02
34h	52	LED CC Map Pt. 02
35h	53	Control Channels	buttons ch / encoders ch / leds ch / analog cc ch / analog note ch)
36h	54	Button Toggle Mode Enable
37h	55	Global Encoder Flip (used once on firmware change)
38h	56	Local Control Color
39h	57	Capacative Fader Map Notes
3Ah	58	Capacative Fader Map CCs
3Bh	59	Capacative Fader Values
3Ch	60	Capacative Fader Output Mode
3Dh	61	LED Ring Color Map (all banks)
3Eh	62	Stream All FSR States
3Fh 63	Touch Button Sensitivity
40h 64	Stream All FSR States response
41h 65	Capacitive Button Map
42h 66	Analog Output Flags
43h 67	Set 7-Segment Displays (Livid Spec)
44h 68	Link Function Button Indicator LEDs
45h 69	Disable Capacitve Fader Note Messages

7Eh	126	NAK Negative Acknowledge
7Fh	127	ACK Positive Acknowledge
*/
var cmdfriendly = {
0 : "[reserved]",
1 : "[reserved]",
2 : "Save User Settings",
3 : "[reserved]",
4 : "All LED indicators",
5 : "Recall User Settings",
6 : "Factory Reset",
8 : "Local Control Response",
9 : "Single LED Indicator",
10 : "Analog Inputs",
11 : "Buttons",
12 : "MIDI Settings Channel",
13 : "MIDI Output Merge",
14 : "Erase MIDI Input Map",
15 : "Request Controller options",
16 : "Encoder MIDI mapping",
17 : "Encosion Style mapping",
18 : "Analog Channel Map",
19 : "Button Channel Map",
20 : "Encoder Channel Map",
21 : "LED Channel Map",
22 : "Bank Channel",
23 : "All Bank Channels",
24 : "Save Current Bank Settings",
25 : "Save All Bank Settings",
26 : "Current Bank Number",
27 : "Button Map (part 2)",
28 : "Restore Current Bank",
29 : "Set Ring Mode (all encoders)",
30 : "Set Encoder Speed",
31 : "Set LED Ring indicators",
32 : "Local Ring Control",
33 : "Map Expansion Analog Inputs",
34 : "Map Color Scheme",
35 : "LED Note Map ",
36 : "LED CC Map",
37 : "LEDs All Banks ",
38 : "Encoder Values ",
39 : "Encoder Values All Banks",
40 : "Is Encoder",
41 : "Analog Filter Mode",
42 : "LED Last Column",
43 : "Encoder Value Flip",
44 : "Analog Value Flip",
45 : "Analog Disable",
46 : "LED Group",
47 : "Encoder LED Local Control",
48 : "Analog LED Local Control",
49 : "Analog Note Assignment",
50 : "LED Ring Style",
51 : "LED Note (part 2)",
52 : "LED CC (part 2)",
53 : "Control Channels",
54 : "Button Toggle Mode Enable",
55 : "Global Encoder Flip",
56 : "Local Control Color",
57 : "Capacative Fader Map Notes",
58 : "Capacative Fader Map CCs",
59 : "Capacative Fader Values",
60 : "Capacative Fader Output Mode",
61 : "LED Ring Color Map (all banks)",
62 : "Stream All FSR States",
63 : "Touch Button Sensitivity",
64 : "Stream All FSR States response",
65 : "Capacative Touch Buttons Map",
66 : "Analog Output Flags",
67 : "Set 7-Segment Displays (Livid Spec)",
68 : "Link Function Button Indicator LEDs",
69 : "Disable Capacitve Fader Note Messages",
127 : "Settings Received",
247 : "EOX"
}

var SAFARI = false;
var SCHED = 5; //ms
var REQSCHED = 200;
var DO_DISCNXN = false; //enables a routine that will disconnect midiin when we send a settings command. For some reason, Safari needs to gate the ACK from coming in after a CMD is sent. 

var lock = 1;
var CNO = 0; //command number, used in lividToSx and sxToObj

//sysex command headers
var mfg = 97; //livid
var pid = 4; //ohm...etc

var firmware = [];
var firmware_sym = "";
var firmware_float = 0.;
var firmware_old = false;

var BRAIN = (pid==1);
var OHM64 = (pid==2);
var BLOCK = (pid==3);
var CODE = (pid==4);
var MCD = (pid==5);
var MCP = (pid==6);
var OHMRGB = (pid==7);
var OHMRGB_OLD = (pid==7 && firmware_old);
var CNTRLR = (pid==8);
var CNTRLR_OLD = (pid==8 && firmware_old);
var BRAIN2 = (pid==9);
var ENLIGHTEN = (pid==10);
var ALIAS8 = (pid==11);
var BASE = (pid==12);
var BRAINJR = (pid==13);
var MIDICV = (pid==14);
var GUITARWING = (pid==15);
var DS1 = (pid==16);
var BASEII = (pid==17);

var ch = 0;
var v1 = 0;
var v2 = 0;
var v3 = 0;
var v4 = 0;
var head = [240, 0, 1, mfg, pid];
var eom = 247;
var tomatch = [240,126,ch,6,2,0,1,mfg,1,0,pid,0,v1,v2,v3,v4,247];
var inquiry =  [240,126,127,6,1,247];
var has_ledring = true;
var has_btntog = true;
var has_rgb = false;
var has_enc = true;
var has_setch = false;
var has_midi = true;
var has_local = true;
var is_diy = false;

var req_max = 64;
var requesting = 0;
//table of requests needed for each product.
var requests = {};
var resetting_defaults = false;
requests[2]=[4,8,
[9,0,0],[9,1,0],[9,2,0],[9,3,0],[9,4,0],[9,5,0],[9,6,0],[9,7,0],[9,8,0],[9,9,0],[9,10,0],[9,11,0],[9,12,0],[9,13,0],[9,14,0],[9,15,0],[9,16,0],[9,17,0],[9,18,0],[9,19,0],[9,20,0],[9,21,0],[9,22,0],[9,23,0],[9,24,0],[9,25,0],[9,26,0],[9,27,0],[9,28,0],[9,29,0],[9,30,0],[9,31,0],[9,32,0],[9,33,0],[9,34,0],[9,35,0],[9,36,0],[9,37,0],[9,38,0],[9,39,0],[9,40,0],[9,41,0],[9,42,0],[9,43,0],[9,44,0],[9,45,0],[9,46,0],[9,47,0],[9,48,0],[9,49,0],[9,50,0],[9,51,0],[9,52,0],[9,53,0],[9,54,0],[9,55,0],[9,56,0],[9,57,0],[9,58,0],[9,59,0],[9,60,0],[9,61,0],[9,62,0],[9,63,0],[9,64,0],[9,65,0],[9,66,0],[9,67,0],[9,68,0],[9,69,0],[9,70,0],[9,71,0],[9,72,0],[9,73,0],[9,74,0],[9,75,0],[9,76,0],[9,77,0],[9,78,0],[9,79,0],[9,80,0],[9,81,0],[9,82,0],[9,83,0],[9,84,0],[9,85,0],[9,86,0],[9,87,0],[9,88,0],[9,89,0],[9,90,0],[9,91,0],[9,92,0],[9,93,0],[9,94,0],[9,95,0],[9,96,0],[9,97,0],[9,98,0],[9,99,0],[9,100,0],[9,101,0],[9,102,0],[9,103,0],[9,104,0],[9,105,0],[9,106,0],[9,107,0],[9,108,0],[9,109,0],[9,110,0],[9,111,0],[9,112,0],[9,113,0],[9,114,0],[9,115,0],[9,116,0],[9,117,0],[9,118,0],[9,119,0],[9,120,0],[9,121,0],[9,122,0],[9,123,0],[9,124,0],[9,125,0],[9,126,0],[9,127,0],
[9,0,1],[9,1,1],[9,2,1],[9,3,1],[9,4,1],[9,5,1],[9,6,1],[9,7,1],[9,8,1],[9,9,1],[9,10,1],[9,11,1],[9,12,1],[9,13,1],[9,14,1],[9,15,1],[9,16,1],[9,17,1],[9,18,1],[9,19,1],[9,20,1],[9,21,1],[9,22,1],[9,23,1],[9,24,1],[9,25,1],[9,26,1],[9,27,1],[9,28,1],[9,29,1],[9,30,1],[9,31,1],[9,32,1],[9,33,1],[9,34,1],[9,35,1],[9,36,1],[9,37,1],[9,38,1],[9,39,1],[9,40,1],[9,41,1],[9,42,1],[9,43,1],[9,44,1],[9,45,1],[9,46,1],[9,47,1],[9,48,1],[9,49,1],[9,50,1],[9,51,1],[9,52,1],[9,53,1],[9,54,1],[9,55,1],[9,56,1],[9,57,1],[9,58,1],[9,59,1],[9,60,1],[9,61,1],[9,62,1],[9,63,1],[9,64,1],[9,65,1],[9,66,1],[9,67,1],[9,68,1],[9,69,1],[9,70,1],[9,71,1],[9,72,1],[9,73,1],[9,74,1],[9,75,1],[9,76,1],[9,77,1],[9,78,1],[9,79,1],[9,80,1],[9,81,1],[9,82,1],[9,83,1],[9,84,1],[9,85,1],[9,86,1],[9,87,1],[9,88,1],[9,89,1],[9,90,1],[9,91,1],[9,92,1],[9,93,1],[9,94,1],[9,95,1],[9,96,1],[9,97,1],[9,98,1],[9,99,1],[9,100,1],[9,101,1],[9,102,1],[9,103,1],[9,104,1],[9,105,1],[9,106,1],[9,107,1],[9,108,1],[9,109,1],[9,110,1],[9,111,1],[9,112,1],[9,113,1],[9,114,1],[9,115,1],[9,116,1],[9,117,1],[9,118,1],[9,119,1],[9,120,1],[9,121,1],[9,122,1],[9,123,1],[9,124,1],[9,125,1],[9,126,1],[9,127,1],
10,11,12,13,15,100]; //ohm64
requests[3]=[4,8,
[9,0,0],[9,1,0],[9,2,0],[9,3,0],[9,4,0],[9,5,0],[9,6,0],[9,7,0],[9,8,0],[9,9,0],[9,10,0],[9,11,0],[9,12,0],[9,13,0],[9,14,0],[9,15,0],[9,16,0],[9,17,0],[9,18,0],[9,19,0],[9,20,0],[9,21,0],[9,22,0],[9,23,0],[9,24,0],[9,25,0],[9,26,0],[9,27,0],[9,28,0],[9,29,0],[9,30,0],[9,31,0],[9,32,0],[9,33,0],[9,34,0],[9,35,0],[9,36,0],[9,37,0],[9,38,0],[9,39,0],[9,40,0],[9,41,0],[9,42,0],[9,43,0],[9,44,0],[9,45,0],[9,46,0],[9,47,0],[9,48,0],[9,49,0],[9,50,0],[9,51,0],[9,52,0],[9,53,0],[9,54,0],[9,55,0],[9,56,0],[9,57,0],[9,58,0],[9,59,0],[9,60,0],[9,61,0],[9,62,0],[9,63,0],[9,64,0],[9,65,0],[9,66,0],[9,67,0],[9,68,0],[9,69,0],[9,70,0],[9,71,0],[9,72,0],[9,73,0],[9,74,0],[9,75,0],[9,76,0],[9,77,0],[9,78,0],[9,79,0],[9,80,0],[9,81,0],[9,82,0],[9,83,0],[9,84,0],[9,85,0],[9,86,0],[9,87,0],[9,88,0],[9,89,0],[9,90,0],[9,91,0],[9,92,0],[9,93,0],[9,94,0],[9,95,0],[9,96,0],[9,97,0],[9,98,0],[9,99,0],[9,100,0],[9,101,0],[9,102,0],[9,103,0],[9,104,0],[9,105,0],[9,106,0],[9,107,0],[9,108,0],[9,109,0],[9,110,0],[9,111,0],[9,112,0],[9,113,0],[9,114,0],[9,115,0],[9,116,0],[9,117,0],[9,118,0],[9,119,0],[9,120,0],[9,121,0],[9,122,0],[9,123,0],[9,124,0],[9,125,0],[9,126,0],[9,127,0],
[9,0,1],[9,1,1],[9,2,1],[9,3,1],[9,4,1],[9,5,1],[9,6,1],[9,7,1],[9,8,1],[9,9,1],[9,10,1],[9,11,1],[9,12,1],[9,13,1],[9,14,1],[9,15,1],[9,16,1],[9,17,1],[9,18,1],[9,19,1],[9,20,1],[9,21,1],[9,22,1],[9,23,1],[9,24,1],[9,25,1],[9,26,1],[9,27,1],[9,28,1],[9,29,1],[9,30,1],[9,31,1],[9,32,1],[9,33,1],[9,34,1],[9,35,1],[9,36,1],[9,37,1],[9,38,1],[9,39,1],[9,40,1],[9,41,1],[9,42,1],[9,43,1],[9,44,1],[9,45,1],[9,46,1],[9,47,1],[9,48,1],[9,49,1],[9,50,1],[9,51,1],[9,52,1],[9,53,1],[9,54,1],[9,55,1],[9,56,1],[9,57,1],[9,58,1],[9,59,1],[9,60,1],[9,61,1],[9,62,1],[9,63,1],[9,64,1],[9,65,1],[9,66,1],[9,67,1],[9,68,1],[9,69,1],[9,70,1],[9,71,1],[9,72,1],[9,73,1],[9,74,1],[9,75,1],[9,76,1],[9,77,1],[9,78,1],[9,79,1],[9,80,1],[9,81,1],[9,82,1],[9,83,1],[9,84,1],[9,85,1],[9,86,1],[9,87,1],[9,88,1],[9,89,1],[9,90,1],[9,91,1],[9,92,1],[9,93,1],[9,94,1],[9,95,1],[9,96,1],[9,97,1],[9,98,1],[9,99,1],[9,100,1],[9,101,1],[9,102,1],[9,103,1],[9,104,1],[9,105,1],[9,106,1],[9,107,1],[9,108,1],[9,109,1],[9,110,1],[9,111,1],[9,112,1],[9,113,1],[9,114,1],[9,115,1],[9,116,1],[9,117,1],[9,118,1],[9,119,1],[9,120,1],[9,121,1],[9,122,1],[9,123,1],[9,124,1],[9,125,1],[9,126,1],[9,127,1],
10,11,12,13,33,100]; //block
requests[4]=[4,8,11,12,13,15,17,22,23,26,30,31,32,54,35,36,16,38,39,50,55,75]; //code v2 //note that 54 is in the middle. Not sure why it needs to be but was choking after 37. 16 comes after 35 and 36, since this list is used to dump sysex after preset read.
requests[7]=[4,8,10,11,12,13,15,22,23,26,33,34,54,35,36]; //ohmrgb
requests[8]=[4,8,10,11,12,13,17,22,23,26,29,30,31,32,33,34,35,36,16,38,39,50,54,55]; //cntrlr //50,54,55 not used in 100 or less, 16 comes after 35 and 36, since this list is used to dump sysex after preset read.
//requests[9]=[4,8,10,11,12,13,16,17,22,26,27,30,31,32,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]; //brainv2
requests[9]=[4]; //brainv2 abriged
requests[11]=[4,8,10,11,12,16,17,22,23,26,30,33,34,35,36,38,39,54,55,56]; //alias8
requests[12]=[4,8,10,11,12,22,23,26,34,35,36,41,49,50,54,56,57,58,59,60,61,66,68,69,70]; //base
//requests[13]=[4,8,10,11,12,13,16,17,22,26,27,30,31,32,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]; //brain jr
requests[13]=[4]; //brain jr abridged
requests[16]=[4,8,10,11,12,16,17,22,30,34,35,36,38,54,55,76]; //ds1
requests[17]=[4,8,10,11,12,22,23,26,34,35,36,41,49,50,54,56,57,58,59,60,61,66,68,69,70]; //base
              
var savecmd = 25; //either 2 or 25. Block and Ohm64 are 2, so we'll make that adjustment on the product detection result.

var sx_send={}; //CMD numbers that we need to send out on a dump of all sysex
sx_send[2]=[4,10,11,12,13,15,35,36]; //35 and 36 aren't actually part of Ohm64 spec, but we fake them to make LED handling easier.
sx_send[3]=[4,10,11,12,13,33,35,36]; //33 is expansion. 
sx_send[4]=[4,11,12,13,17,23,30,31,35,36,50,54,16]; // 4 is product id of Code. We are excluding 22 Bank Ch and 26 Bank Number. We do 16 last because it needs to come after 35 and 36.
sx_send[7]=[4,10,11,12,13,15,22,23,26,33,34,35,36,54]; //ohmrgb
sx_send[8]=[4,10,11,12,13,17,22,23,26,29,30,31,32,33,34,35,36,50,54,16]; //cntrlr
sx_send[11]=[4,10,11,12,17,23,30,33,34,35,36,39,54,56,16]; //alias
sx_send[12]=[4,10,11,12,22,23,34,35,36,41,49,50,54,56,57,58,59,60,61,65,66,67,68,70]; //base
sx_send[16]=[4,10,11,12,16,17,22,30,34,35,36,54,55,76,16]; //ds1
sx_send[17]=[4,10,11,12,22,23,34,35,36,41,49,50,54,56,57,58,59,60,61,65,66,67,68,70]; //base II

var localflags = [1,0,0,0,0,0,1]; //security bit,btn momentary local,btn toggle local,enc abs local,enc rel local,(reserved)
var livid={};
livid.btn = []; //nn mode(note or cc) toggle isencspeed isbank ismmc
livid.pot = []; //nn mode
livid.exp = []; //nn mode (same as pot, but expansion jacks)
livid.enc = []; //nn mode(note or cc) type(cc or +/-) value
livid.encvalues = []; //array of all encoder values in all banks
livid.fsr = []; //nn cc cc_enable poly_enable filter color
livid.slide = []; //cc nn mode ledstyle
livid.ledring = []; //nn mode style (walk,fill,eq,spread) eachled
livid.led = []; //nn mode onoff
livid.colormap = [];
livid.globl = {}; //encspeedA, encspeedB, settingsch, ringlocal, btnlocal, omni, merge, enc_flip,bankch,bank,bankchs,slidenote
//we'll init other objects for livid.globl in sysexToLivid functions, but let's do these now:
livid.globl.omni = 0;
livid.globl.btnlocal_mom = 0;
livid.globl.btnlocal_tog = 0;
livid.globl.ringlocal_abs = 0;
livid.globl.ringlocal_rel = 0;
livid.globl.agslocal_pot =  0;
livid.globl.agslocal_fsr =  0;
livid.globl.linkfbleds = 0; //for base - link the LEDS on the F-buttons, rather than having them with separate controls.
livid.globl.flip = 0;
livid.globl.encdet_abs = 0;
livid.globl.encdet_rel = 0;


//associate types with sysex command ids so we know which messages to send out on update. 
//Without this, we'd have to send them all out for each command. 
//This is a master list and not product dependent. We filter unnecessary commands with an indexOf check against sx_send[pid] to see if we should really send a CMD.
var cmds = {};
cmds.btn=[11,54];
cmds.pot=[10,18,41,44,45,48];
cmds.exp=cmds.pot;
cmds.enc=[16,17,29,38,39];
cmds.fsr=[4,10,41,49,66];
cmds.slide=[50,57,58,60,61];
cmds.ledring=[35,36,50,16,31]; //send 16 after 35 and 36: When the LED Ring is Mapped the same, they get LED Feedback from software but not encoder. When Nothing is Mapped the same, the Encoder is Unmapped.
cmds.led=[4,35,36,16];
//cmds.led=[4,16];
cmds.colormap=[34];
cmds.globl={};
cmds.globl.encspeedA=[30];
cmds.globl.encspeedB=[30];
cmds.globl.settingsch=[12];
cmds.globl.settingsch_enable=[12];
cmds.globl.merge=[13];
cmds.globl.enc_flip=[55];
cmds.globl.encdet=[75]; //encoder settings for detented encoders
cmds.globl.localcolor=[76]; //set on and off colors for local control
cmds.globl.xfadeflip=[15];
cmds.globl.bank=[26];
cmds.globl.onech=[12];
cmds.globl.bankch=[22];
cmds.globl.bankchs=[23];
cmds.globl.atouchspeed=[70];
cmds.globl.ringlocal_abs=[];//sent on CC, so we don't need a sysex CMD id association
cmds.globl.ringlocal_rel=[];//sent on CC, so we don't need a sysex CMD id association
cmds.globl.ringlocal_slide=[];//sent on CC, so we don't need a sysex CMD id association
cmds.globl.btnlocal_mom=[]; //sent on CC, so we don't need a sysex CMD id association
cmds.globl.btnlocal_tog=[]; //sent on CC, so we don't need a sysex CMD id association
cmds.globl.agslocal_pot=[]; //sent on CC, so we don't need a sysex CMD id association
cmds.globl.agslocal_fsr=[]; //sent on CC, so we don't need a sysex CMD id association
cmds.globl.omni=[]; //sent on CC, so we don't need a sysex CMD id association

var sx = new Object(); //container for all the sysex strings we get back from the controller from requests sx[cmdID] has the heart of the string in it.
var sx_clone = new Object();

sx.name = "__received"; //normally used for preset name, but this isn't a preset

var BANKIN = 113; //sysex ID of message that comes in from controller when you change the bank using a bank cycle button.
var ACK = 127; //acknowledgement from controller
var NACK = 126; //negative acknowledgement from controller - some sort of error.

var undobuffer = {};
undobuffer[0] = [];
undobuffer[1] = [];
undobuffer[2] = [];
undobuffer[3] = [];
undobuffer[4] = [];
undobuffer[5] = [];
undobuffer[6] = [];
undobuffer[7] = [];
var undothis = [];
undothis[0] = [];
undothis[1] = [];
undothis[2] = [];
undothis[3] = [];
undothis[4] = [];
undothis[5] = [];
undothis[6] = [];
undothis[7] = [];
var undocount = 0;

var miditoID=[];

var updatenow=1; //this gets rid of the need for the "send to <controller>" button.
var theurl = "http://127.0.0.1:8084/index.html?id="+pid;

//maps the cr value to ID value for LEDs:
var crtoID = {}; //use pid as an arg to call up desired map
crtoID[2] = [0,6,12,18,24,30,36,42,48,54,-1,60,66,72,-1,-1,1,7,13,19,25,31,37,43,49,55,-1,61,67,73,-1,-1,2,8,14,20,26,32,38,44,50,56,-1,62,68,74,-1,-1,3,9,15,21,27,33,39,45,51,57,-1,63,69,-1,-1,-1,4,10,16,22,28,34,40,46,52,58,-1,64,70,-1,-1,-1,5,11,17,23,29,35,41,47,53,59,-1,65,71];
crtoID[3] = [0 ,8 ,16,24,32,40,48,56,
			5 ,13,-1,21,29,37,-1,-1,
			1 ,9 ,17,25,33,41,49,57,
			6 ,14,-1,22,30,38,-1,-1,
			2 ,10,18,26,34,42,50,58,
			7 ,15,-1,23,31,39,-1,-1,
			3 ,11,19,27,35,43,51,59,
			45,53,-1,61,47,55,-1,-1,
			4 ,12,20,28,36,44,52,60,
			46,54,-1,62,63];
crtoID[4] = [  0, 8,16,24,
               1, 9,17,25,
               2,10,-1,18,26,
               3,-1,-1,11,19,27,
               4,12,20,28,
               5,13,21,-1,29,
               6,14,-1,-1,22,30,
               7,15,23,31,
              32,33,34,35,  -1,36,
              37,38,-1,-1,39,40,41,42,43,44,
              /*ledrings*/
               0, 8,16,24,
               1, 9,17,25,
               2,10,18,26,
               3,11,19,27,
               4,12,20,28,
               5,13,21,29,
               6,14,22,30,
               7,15,23,31
              ];
crtoID[7] = [7,23,39,55,15,31,47,63,6,22,38,54,14,30,46,62,5,21,37,53,13,29,45,61,4,20,36,52,12,28,44,60,3,19,35,51,11,27,43,59,2,18,34,50,10,26,42,58,1,17,33,49,9,25,41,57,0,16,32,48,8,24,40,56,74,77,66,67,75,78,68,69,76,79,64,65,73,72,71,70,80];
crtoID[8] = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15,
			 16,32,17,33, 18,34,19,35, 20,36,21,37, 22,38,23,39,
			 24,40,25,41, 26,42,27,43, 28,44,29,45, 30,46,31,47,
			 48,49,50,51, 52,53,54,55, 56,57,58,59];
crtoID[11] = [0,2,4,6,1,3,5,7,8,10,12,14,9,11,13,15,16,17];
crtoID[12] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
//0 4 8 12 16 20 24 28 32 36 40 44 1 5 9 13 17 21 25 29 33 37 41 45 88 
crtoID[16] = [0,12,-1,-1,1,13,-1,-1,2,14,-1,-1,3,15,-1,-1,4,16,-1,-1,5,17,-1,-1,6,18,-1,-1,7,19,-1,-1,8,20,-1,-1,9,21,-1,-1,10,22,-1,-1,11,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24];
crtoID[17] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];

//maps ID value to cr value for LEDs:
var IDtocr= {}; //use pid as an arg to call up desired map
IDtocr[2] = [0,16,32,48,64,80,1,17,33,49,65,81,2,18,34,50,66,82,3,19,35,51,67,83,4,20,36,52,68,84,5,21,37,53,69,85,6,22,38,54,70,86,7,23,39,55,71,87,8,24,40,56,72,88,9,25,41,57,73,89,11,27,43,59,75,91,12,28,44,60,76,92,13,29,45];
IDtocr[3] = [0,16,32,48,64,8,24,40,1,17,33,49,65,9,25,41,
      2,18,34,50,66,11,27,43,3,19,35,51,67,12,28,44,
			4,20,36,52,68,13,29,45,5,21,37,53,69,56,72,60,
			6,22,38,54,70,57,73,61,7,23,39,55,71,59,75,76];
IDtocr[4] = [ 0, 4, 8, 13,19,23,28,34,
              1, 5, 9,16,20,24,29,35,
              2, 6,11,17,21,25,32,36,
              3, 7,12,18,22,27,33,37,
              38,39,40,41,
              43,44,45,48,49,50,51,52,53,
              /*ledrings*/
              54,58,62,66,70,74,78,82,
              55,59,63,67,71,75,79,83,
              56,60,64,68,72,76,80,84,
              57,61,65,69,73,77,81,85];
IDtocr[7] = [ 56,48,40,32,24,16, 8,00,
              60,52,44,36,28,20,12, 4,
              57,49,41,33,25,17,9, 1,
              61,53,45,37,29,21,13, 5,
              58,50,42,34,26,18,10, 2,
              62,54,46,38,30,22,14, 6,
              59,51,43,35,27,19,11, 3,
              63,55,47,39,31,23,15, 7,
              74,75,66,67,70,71,79,78,
              77,76,64,68,72,65,69,73,
              80];
IDtocr[8] = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15,
			//16,32,17,33, 18,34,19,35, 20,36,21,37, 22,38,23,39,
			16,18,20,22, 24,26,28,30, 32,34,36,38, 40,42,44,46,  
			//24,40,25,41, 26,42,27,43, 28,44,29,45, 30,46,31,47,
			17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,
			48,49,50,51, 52,53,54,55, 56,57,58,59];
IDtocr[11] = [0,4,1,5,2,6,3,7,8,12,9,13,10,14,11,15,16,17]; //16 and 17 are for the character display?
IDtocr[12] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];
IDtocr[16] = [0,4,8,12,16,20,24,28,32,36,40,44,1,5,9,13,17,21,25,29,33,37,41,45,88]; 
IDtocr[17] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63];

//we'll need to reorganize the sysex maps for button, pot, encoder, fsr and expansion maps into ID order. based on the product id.
//position in sysex string to UI index value (ID) used in "mapbytes()"/sysexToLivid.js
var posi={};
posi[2] = {};
posi[3] = {};
posi[4] = {};
posi[7] = {};
posi[8] = {};
posi[11] = {};
posi[12] = {};
posi[16] = {};
posi[17] = {};

//OHM 64
posi[2].btn=[0,8,16,24,32,40,48,56,1,9,17,25,33,41,49,57,2,10,18,26,34,42,50,58,3,11,19,27,35,43,51,59,4,12,20,28,36,44,52,60,5,13,21,29,37,45,53,61,6,14,22,30,38,46,54,62,7,15,23,31,39,47,55,63,64,66,68,70,72,74,75,76,65,67,69,71,73,77,78,79,80,999,999,999,999,999,999,80];
posi[2].pot=[14,13,15,12, 23,20,22,21, 3,2,7,6, 11,10,19,18, 1,0,5,4, 9,8,17,16, 24];
//block
posi[3].btn=[	0,8,16,24,32,40,48,56,
				1,9,17,25,33,41,49,57,
				2,10,18,26,34,42,50,58,
				3,11,19,27,35,43,51,59,
				4,12,20,28,36,44,52,60,
				5,13,21,29,37,45,53,61,
				6,14,22,30,38,46,54,62,
				7,15,23,31,39,47,55,63, 
				70,-1,66,67,69,64,65,68];
posi[3].pot=[3,2,1,0,5,4,6,7,9,8];
posi[3].exp=[4,8,5,9,2,6,3,7,1];
//CODE
posi[4].btn=[0, 1, 8, 9, 16, 17, 24, 25,2, 3, 10,11,18,19,26,27,4,5,12,13,20,21,28,29,6,7,14,15,22,23,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
posi[4].enc=[0,8,16,24,1,9,17,25,2,10,18,26,3,11,19,27,4,12,20,28,5,13,21,29,6,14,22,30,7,15,23,31];
//OHM RGB
posi[7].btn=[0,8,16,24,32,40,48,56,
			1,9,17,25,33,41,49,57,
			2,10,18,26,34,42,50,58,
			3,11,19,27,35,43,51,59,
			4,12,20,28,36,44,52,60,
			5,13,21,29,37,45,53,61,
			6,14,22,30,38,46,54,62,
			7,15,23,31,39,47,55,63,
			64,66,
			68,70,72,74,
			75,76,65,67,
			69,71,73,77,78,79,
			80,80,80,80,80,80,80,80];
posi[7].pot=[14,13,15,12, 23,20,22,21, 3,2,7,6, 11,10,19,18, 1,0,5,4, 9,8,17,16, 24,/* expansion */28,32,29,33,30,34,31,35,26,27];
//posi[7].exp=[0,1,2,3,4,5,6,7,8,9];
posi[7].exp=[4,8,5,9,2,6,3,7,1,0];
//CNTRL:R
posi[8].btn=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];
posi[8].enc=[0,1,2,3,4,5,6,7,8,9,10,11];
posi[8].pot=[19,27,11,26,3,2,18, 10,0, 17,8,9,16, 1,24,25, 21,29,13, 28,5,20,4, 12,22,30,14, 7,6,15,31,23];
posi[8].exp=[4,8,5,9,2,6,3,7,1];
//ALIAS8
posi[11].btn=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
posi[11].enc=[0,1,2,3]; //there's only 1 encoder, but the sysex for this is primed for 4. Ask justin...
posi[11].pot=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
//BASE
posi[12].btn=[32,33,34,35,36,37,38,39, 48,49,50,51,52,53,54,55]; //fbtns, cap btns. IDs start at 32 to keep sync w/ LEDs.
posi[12].pot=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
posi[12].slide=[0,1,2,3,4,5,6,7,8];
posi[12].fsr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
//DS1
posi[16].btn=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
posi[16].enc=[0,1,2,3];
posi[16].pot=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
//BASE II
posi[17].btn=[32,33,34,35,36,37,38,39, 48,49,50,51,52,53,54,55]; //fbtns, cap btns. IDs start at 32 to keep sync w/ LEDs.
posi[17].pot=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
posi[17].slide=[0,1,2,3,4,5,6,7,8];
posi[17].fsr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

//need to create the inverse of posi,
//ID to position in sysex string...
var ipos={};
ipos[2] = {};
ipos[3] = {};
ipos[4] = {};
ipos[7] = {};
ipos[8] = {};
ipos[11] = {};
ipos[12] = {};
ipos[16] = {};
ipos[17] = {};
//OHM64
ipos[2].btn=[0,8,16,24,32,40,48,56,1,9,17,25,33,41,49,57,2,10,18,26,34,42,50,58,3,11,19,27,35,43,51,59,4,12,20,28,36,44,52,60,5,13,21,29,37,45,53,61,6,14,22,30,38,46,54,62,7,15,23,31,39,47,55,63,64,72,65,73,66,74,67,75,68,76,87,69,70,71,77,78,79];
ipos[2].pot=[17,16,9,8, 19,18,11,10, 21,20,13,12, 3,1,0,2, 23,22,15,14, 5,7,6,4, 24,/*expansion jacks:*/25,0,26,0,27,0,28,0,29,0,30,0,31,0,32,0, 33,0,34,0];
//block
ipos[3].btn=[	0,8,16,24,32,40,48,56,
				1,9,17,25,33,41,49,57,
				2,10,18,26,34,42,50,58,
				3,11,19,27,35,43,51,59,
				4,12,20,28,36,44,52,60,
				5,13,21,29,37,45,53,61,
				6,14,22,30,38,46,54,62,
				7,15,23,31,39,47,55,63, 
				70,-1,66,67,69,64,65,68];
ipos[3].pot=[3,2,1,0,4,5,4,6,7,9,8];
ipos[3].exp=[9,8,4,6,0,2,5,7,1,3];
//CODE
ipos[4].btn=[0,1,8,9,16,17,24,25,2,3,10,11,18,19,26,27,4,5,12,13,20,21,28,29,6,7,14,15,22,23,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
ipos[4].enc=[0,4,8,12,16,20,24,28,1,5,9,13,17,21,25,29,2,6,10,14,18,22,26,30,3,7,11,15,19,23,27,31];
//OHM RGB
ipos[7].btn=[0,8,16,24,32,40,48,56,
			1,9,17,25,33,41,49,57,
			2,10,18,26,34,42,50,58,
			3,11,19,27,35,43,51,59,
			4,12,20,28,36,44,52,60,
			5,13,21,29,37,45,53,61,
			6,14,22,30,38,46,54,62,
			7,15,23,31,39,47,55,63,
			64,72,65,73,66,74,67,75,
			68,76,69,70,71,77,78,79,
			87];
ipos[7].pot=[17,16,9,8, 19,18,11,10, 21,20,13,12, 3,1,0,2, 23,22,15,14, 5,7,6,4, 24,/*expansion jacks:*/25,0,26,0,27,0,28,0,29,0,30,0,31,0,32,0, 33,0,34,0];
ipos[7].exp=[9,8,4,6,0,2,5,7,1,3];
//CNTRL:R
ipos[8].btn=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];
ipos[8].enc=[0,1,2,3,4,5,6,7,8,9,10,11];
ipos[8].pot=[8,13,5,4,22,20,28,27,10,11,7,2,23,18,26,29,12,9,6,0,21,16,24,31,14,15,3,1,19,17,25,30];
ipos[8].exp=[9,8,4,6,0,2,5,7,1,3];
//ALIAS8
ipos[11].btn=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
ipos[11].enc=[0];
ipos[11].pot=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
//BASE
ipos[12].btn=[	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,1,2,3,4,5,6,7,
				0,0,0,0,0,0,0,0,
				8,9,10,11,12,13,14,15
];
ipos[12].slide=[0,1,2,3,4,5,6,7,8];
ipos[12].fsr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
//DS1
ipos[16].btn=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
ipos[16].enc=[0,1,2,3];
ipos[16].pot=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
//BASE II
ipos[17].btn=[	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,1,2,3,4,5,6,7,
				0,0,0,0,0,0,0,0,
				8,9,10,11,12,13,14,15
];
ipos[17].slide=[0,1,2,3,4,5,6,7,8];
ipos[17].fsr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

//the bits in CMD54 map in a weird way on the Code. This table adjusts that
var togglebitmap = {}; //use pid as an argument to call up the desired map
togglebitmap[2] = posi[2].btn;
togglebitmap[3] = posi[3].btn;
togglebitmap[4] = posi[4].btn;
togglebitmap[7] = posi[7].btn;
togglebitmap[8] = posi[8].btn;
togglebitmap[11] = posi[11].btn;
togglebitmap[12] = posi[12].btn;
togglebitmap[16] = posi[16].btn;
togglebitmap[17] = posi[17].btn;

//need to translate the encoder speed to and from the UI widget, since encoder speed values are discontinuous
var e_speedfromUI=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,66,67,68,69,70,71,72,73,74,75,76,77,78,79]; //for proper display of UI
var e_speedtoUI=[-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

//convert symbols from menus to ints. notice that there is a 'cc' and a 'cc.' - just a hack to make them unique :(
var nanhash = {
'note':0, 'cc':1, 
'walk':0, 'fill':1, 'eq':2, 'spread':3, 
'absolute':0, 'relative':1, 
'cc.':0, 'bend':1, 'aftertouch':2,
'Low':0, 'Mid':1, 'Medium':2 ,'High':3, 'Highest':4,
'abs+fine':0, 'precision':1 ,'fine':2 ,'inc/dec':3,
'absoute':0, 'relative':1,
'invert':0,'red':1,'green':2,'yellow':3,'blue':4,'magenta':5,'cyan':6,'white':7,
'1x':1,'2x':2,'3x':3,'4x':4,'5x':5,'6x':6,'7x':7,'8x':8,'9x':9,'10x':10,'11x':11,'12x':12,'13x':13,'14x':14,'15x':15,'1/2x':66,'1/3x':67,'1/4x':68,'1/5x':69,'1/6x':70,'1/7x':71,'1/8x':72,'1/9x':73,'1/10x':74,'1/11x':75,'1/12x':76,'1/13x':77,'1/14x':78,'1/15x':79
};
var products = ["-","Brain","Ohm64","block","Code","MCDAW","MCP","OhmRGB","CNTRL:R","BrainV2","Enlighten","Alias 8","Base","Brain Jr.","BrainCV","Guitar Wing","DS1","BaseII"];
var colorhash = ["off","red","green","yellow","blue","magenta","cyan","white"];
var bgcolors = ["rgba(0,0,0,0.3)","rgba(255,0,0,0.3)","rgba(0,255,0,0.3)","rgba(255,255,0,0.3)","rgba(0,0,255,0.3)","rgba(255,0,255,0.3)","rgba(0,255,255,0.3)","rgba(255,255,255,1)"];

//not sure how to get the img dimensions, so I'll preset them here. 
var dim=[];
dim[1]=[700,600]; //brain - placholder
dim[2]=[705,400]; //ohm64
dim[3]=[542,541]; //block
dim[4]=[654,392]; //code v2
dim[7]=[705,743]; //ohmrgb
dim[8]=[707,516]; //cntrl:r
dim[9]=[700,600]; //brain v2 - placholder
dim[11]=[690,485]; //alias
dim[12]=[700,607]; //base
dim[13]=[700,600]; //brain jr - placholder
dim[16]=[802,712]; //DS1 
dim[17]=[700,607]; //base II
//*******************************

//need this because the Jazz plug-in 1.2.1 is a bit tweaky with Safari, so we slow the sending of sysex and gate ACK....
//called in index.html, but it's commented out for now, as it seems ok.
function isSafari(v){
	if(v){
		SCHED = 50; //ms
		DO_DISCNXN = true;
		REQSCHED = 200;
		SAFARI = true;
		clog('this is safari');
	}
}

//used for dev, not currently called:
function getsx(v){
	var opt=0;
	if(v){ 
		opt=1 
	};
	var sysexfile = ["sx_default.json","sx_dynamic.json"];
	$.getJSON("js/"+sysexfile[opt], function(bjson) {
		clog("sx from json read");
		sx = bjson;
	})
	.success(function() { toobj(); log("CH "+livid.globl.bankchs[0]+' '+livid.globl.bankchs[1]) })
	.error(function() { alert("sysex: json read error"); })
}

var fw_versions = {};
var curfw = 0;
//store a json file that has all the current firmware verisons in it so we can determine if the user is current or not.
function isnotcurfw(){
    clog("CURRENT FIRMWARE?");
		var cacheavoid = Math.floor( 1000*Math.random() );
		$.getJSON("cur_fw.json?"+cacheavoid, function(json) {	
     clog("READING CURRENT FIRMWARE");	
			fw_versions = json;
			var prodname = products[pid];
			curfw = fw_versions[prodname];
			var curfw_str = curfw+''; //make it a symbol by concactenating emtpy string to the number
			curfw_str = curfw_str.split("."); //ditch the dot
			var last = curfw_str[1][2];
      clog("current firmware version: "+curfw_str);
			if(!curfw_str[1][2]) {
				last="0"; //do this bc last element might be undef. for versions where that is 0.
			}
			curfw_str = curfw_str[0][0]+"."+curfw_str[1][0]+"."+curfw_str[1][1]+"."+last; //reassemble it to make it look nice for user. 
			var old = Number(firmware_float < curfw); //want 1 or 0 since we'll be using it to get an item from array.
			clog("FIRMWARE CHECK "+firmware_float+" < "+curfw+" "+old);
			var fwnote = "Your firmware ("+firmware_sym+") could use an update. The current version is "+curfw_str+". You can update <a href='http://lividinstruments.com/support_downloads.php#firmware'>here</a>";
			if(old){
				alert_panel("Settings requests complete"+"<br>"+fwnote);
				$('#fwupdate').css({visibility: "visible"});
			}else{
				alert_panel("Settings requests complete"+"<br>"+"Your firmware is up to date");
			}
			if(is_diy){
			  msgbox("Your selected controller does not work with the online editor. You can download the appropriate editors from <a href='http://wiki.lividinstruments.com/>the wiki.</a>",1);
			}
			if(BASEII && firmware_float<=0.234){
			  msgbox("There are known issues with the LEDs color settings for this firmware version. We will have an update soon. Thanks for your patience!<br> <a href='https://twitter.com/lividindustry'>Twitter</a> | <a href='https://www.facebook.com/lividinstrumentsinc'>Facebook</a>");
			}
			
		})
		.error(function() { clog("NO FW JSON"); });
}

//sets up the interface with the right graphics, and requests the settings from the controller.
function product(v){
  pid = v;
	productdefs();
	head = [240, 0, 1, mfg, pid];
	//theurl = "http://127.0.0.1:8084/index.html?id="+pid;
	has_ledring = (CODE || CNTRLR || BASE || BASEII); //later versions of CNTRL:R will need this
	has_rgb = (OHMRGB || CNTRLR || CNTRLR_OLD || ALIAS8 || BASE || BASEII || BRAIN2 || BRAINJR || GUITARWING || OHMRGB_OLD || DS1);
	has_setch = (CODE || ALIAS8 || BASE || BASEII || BRAIN2 || OHMRGB || CNTRLR ||DS1);
	has_btntog = (CODE || ALIAS8 || BASE || BASEII || BRAIN2 || OHMRGB || CNTRLR || DS1); 
	has_midi = (OHM64 || CNTRLR || CNTRLR_OLD || OHMRGB || BLOCK || BRAIN || BRAIN2 || CODE); //midi jacks
	has_local = (OHM64 || BLOCK || OHMRGB_OLD || CNTRLR_OLD || CNTRLR_OLD); //standard local control
	has_enc = (CNTRLR || CNTRLR_OLD || CODE || ALIAS8 || DS1);
	has_encadjust = (CNTRLR || CNTRLR_OLD || CODE);
	has_encflip = (CNTRLR || CNTRLR_OLD || CODE || DS1);
	has_localcolor = (DS1);
	var has_encdet = true; //older code firmware <222 doesn't have the command for detented v smooth action
	is_diy = (BRAIN || BRAINJR || BRAIN2 || GUITARWING);
	is_base = (BASE || BASEII);
	has_omni = (!is_base); //right now, only Base doesn't have omni.
	
	var bankcounts = [0,0,0,0,4,0,0,4,4,0,0,15,7,0,0,0,0,7];
	var bankcount = bankcounts[pid];
	ledlock(v); //initialize with the led locked to note
	if(DEBUG || DEBUGMIDI){ //add the console div and testbuttons for debugging
		$('#testbuttons').css({visibility: "visible"});
		$('#console').css({visibility: "visible"});
	}
	if(has_localcolor){
	  $('.localcolors').css({visibility: "visible"});
	}else{
		$('.localcolors').remove();
	}
	//accomodate older firmware for OhmRGB that doesn't have button toggle states.
	if(OHMRGB && (firmware[0] <= 5 && firmware[1] <= 5 && firmware[2] == 0 && firmware[3] == 0) ){
		requests[pid].pop(); //remove the last item in the requests array, which is button toggle states
	}
	if(BASE && (firmware[1] < 2 && firmware[2] == 1 && firmware[3] == 0) ){
		requests[pid].pop(); //remove the last item in the requests array, which is cc retrigger rate. Causes fw 1.16 to fail w/ editor.
	}
	if(CODE && (firmware[1] < 2)){
    requests[pid].pop(); //remove the last item in requests array (75), which doesn't exist on firmware earlier than 222
    has_encdet = false;
    clog("OLD CODE "+requests[pid]);
	}
	if(CNTRLR_OLD){
		requests[8].pop(); //removes "55" from end of requests since there's no enc flip in old cntrlr
		requests[8].pop(); //removes "54" from end of requests since there's no toggle mode in old cntrlr
		requests[8].pop(); //removes "50" from end of requests since there's no ring style in old cntrlr
	}
	if(OHM64 || BLOCK){
		savecmd=2; //change the command number for saving to the device for these products.
	}
	//set up the UI graphics for the detected product:
	$('#canvas').width(dim[pid][0]);
	//$('#topmiddle').width(dim[pid][0]);
	$('#canvas').height(dim[pid][1]);
	$('#paper').width(dim[pid][0]);
	$('#paper').height(dim[pid][1]);
	$('#paper').css({background : 'url(faceplate_'+pid+'.gif)  no-repeat'});
	$('#inspectors').width(dim[pid][0]);
	//clog("BANK COUNT "+bankcount);
	//remove any extra bank channel inputs (code has less than alias, for example)
	for(var i=0;i<16;i++){ 
		if(i>(bankcount-1)){
			$('#bank_'+i).remove();
		}
	};
	if(bankcount<1){
		$('#currentbank_head').remove();
		$('#currentbank_li').remove();
		$('#bankch_head').remove();
		$('.bankli').remove();
	}else{
		$('#onech_head').remove();
		$('#one_ch').remove();
	};
	//get rid of the xfade flip button for anything except Ohm64
	if (!OHM64){
		$('#xfadeflip_li').remove();
	};
	//get rid of the omni button 
	if (!has_omni){
		$('#omni_li').remove();
	};
	if (!has_encflip){ //some have encoders that work backwards and adjustments needed for detented encoders
		$('#encflip_li').remove();
		$('#encoderphys').remove();
		$('#encoderdet').remove();
		$('#encdet_li').remove();
	};
	if (!has_encdet){ //firmware <222 for code doesn't have detent/smooth adjustments
		$('#encoderdet').remove();
		$('#encdet_li').remove();
	};
	if (!has_encadjust){ //we don't want to expose the encoder adjustments on products that never had smooth encoders in the first place.
		$('#encoderdet').remove();
		$('#encdet_li').remove();
	};
	//modify the global panel as needed for the detected product:
	if (!has_ledring){
		//remove the LED ring local buttons
		$('#ringlocal_abs_li').remove();
		$('#ringlocal_rel_li').remove();
	};
	if (!has_midi){
		$('merge_li').remove();
	};
	if (!has_btntog){
		//remove the button local buttons
		$('#btnlocal_tog_li').remove();
		$('#btnlocal_mom_li').remove();
		$('.btog').remove();
	};
	if (!has_local){
		$('#btnlocal_li').remove();
	};
	if (!has_setch){
		$('#settingsch_li').remove();
		$('#settingsch_enable_li').remove();
	};
	if (!has_enc){
		$('#encspeedA_li').remove();
		$('#encspeedB_li').remove();
	};
	if (!is_base){
		$('#agslocal_fsr_li').remove();
		$('#ringlocal_slide_li').remove();
		$('#atouchspeed').remove(); //global control for afterpressure retrigger speed (temporal resolution)
		$('#indivbank').remove(); //the option to make a button act as an individual bank selector (not bank cycle)
		$('#atouchspeed_li').remove();
		//$('#btnlocal_cbtn_li').remove();
	};
	//change the LED control buttons in the inspector
	if(has_rgb){
		$('.mono').remove(); //use remove so spacing is better.
		$('.rgb').css({visibility: "visible"});
	}else{
		$('#color_map').remove();
		$('#colormap_tab').remove();
		$('.rgb').remove();
	};
	//old cntrlr has different ring styles than code or base
	if(CNTRLR_OLD){ 
		$('.ringv1').css({visibility: "visible"});
	}else{
		$('.ringv1').remove();
	};
	/*
	//fix up the browser window:
		window.moveTo(1,45);
		var bw=dim[pid][0]+405;
		var bh=dim[pid][1]+60;
		window.resizeTo(bw,bh);
	*/
	//	//initialize the graphics etc.
	if(!is_diy){
		$("#topmiddle").css({position: "static"}); //navigation area starts as fixed so we can put it above the scrim, but needs to go back to static so the UI has the right spacing.
		beginfaceplate();
		clog("PRODUCT INITIALIZED "+pid);
		$("#fetchsettings").css({visibility: "visible"})
		$("#saveanddefaults").css({visibility: "visible"})
		request();
	}else{
		alert_panel("We're sorry to report, the online editor application does not work for the Livid Brain products or the Guitar Wing. It is for control surfaces only.",1);
		$("#midiioscrim").fadeIn(500); //bring the scrim back.
		request();
	}
}

function productdefs(){	
	BRAIN = (pid==1);
	OHM64 = (pid==2);
	BLOCK = (pid==3);
	CODE = (pid==4);
	MCD = (pid==5);
	MCP = (pid==6);
	OHMRGB = (pid==7 && !firmware_old);
	OHMRGB_OLD = (pid==7 && firmware_old);
	CNTRLR = (pid==8 && !firmware_old);
	CNTRLR_OLD = (pid==8 && firmware_old);
	BRAIN2 = (pid==9);
	ENLIGHTEN = (pid==10);
	ALIAS8 = (pid==11);
	BASE = (pid==12);
	BRAINJR = (pid==13);
	MIDICV = (pid==14);
	GUITARWING = (pid==15);
	DS1 = (pid==16);
	BASEII = (pid==17);
}

function factory_reset(){
	var midiout = [];
	midiout=midiout.concat(head,6,eom);
	sendmidi(midiout);
}
function savetobrain(){
	var midiout = [];
	midiout=midiout.concat(head,savecmd,eom);
	sendmidi(midiout);
}

//we store a chunk of livid.type.id in undo buffer in when getid() is called
//store the parameter just used in the UI
//
function undo(){
	var id = undothis[0][0];
	var type = undothis[0][1];
	var param = undothis[0][2];
	var val = undobuffer[0][param];
	//clog("undo to"+" "+id+" "+type+" "+param+" "+val);
	
	livid[type][id][param]=val;
	//send old value back to controller:
	obToSx();
	//**SCHEDULE THIS
	/*
	for(i in cmds[type]){
		cmdout(cmds[type][i]);
	}
	*/
	somesysex(cmds[type]);
	//update interface:
	getid(type+"_"+id);
}

function url(url){
	theurl=url;
}

//-----------GET VALUES FROM UI AND PUT INTO livid OBJECT--------------------------------

var bankcycle_id = "";
//sets the value for a control in the livid object. 
//First we update the livid object, then call obToSx to generate all sysex, then send the necessary sysex messages
function UI(id,type,param,val){ //e.g. 1 btn nn 10
	if(!requesting) {
		clog("UI(): t-"+type+" id-"+id+" p-"+param+" v-"+val);
		//log("CHECK "+livid["led"][0].nn+" mode "+livid["led"][0].mode+" onoff "+livid["led"][0].onoff);
		//if param is isbank or isencspeed, make the note 126/7 and mode 1
		undothis[0] = [id,type,param,val];
		var typehash = {"led":"LED","btn":"button","enc":"encoder","pot":"pot/slider","globl":"global","ledring": "LED Ring","fsr":"drum pad","slide":"touch slider"};					
		var mode=livid[type][id].mode;
		var notepvs=livid[type][id].nn; //get the pvs note or cc so we can blank that one. otherwise the LED would have 2 notes/ccs possible as controls
		//***check if the note or cc is used in the led or ledring first
		if( (type=="led" || type=="ledring") && (param=="nn" || param=="mode") ){
			var cr,CMD;
			//see if the cr is used in the sx[CMD], and if it is, assign that spot cr code 127 (unassigned)
			var notepvs=livid[type][id].nn; //get the pvs note or cc so we can blank that one. otherwise the LED would have 2 notes/ccs possible as controls
			if (mode==1 || mode=="cc"){
				CMD=36;
				mode="cc";
			}
			if (mode==0 || mode=="note"){
				CMD=35;
				mode="note";
			}
			//get the cr:
			cr=sx[CMD][val]; //val is note# or cc#
			//see what id  is at this cr using  crtoID
			var ID_=crtoID[pid][cr];
			//clog("#### LED "+type+" mode "+mode+" CMD "+CMD+" val "+val+" sx "+sx[CMD]+ " cr "+ cr + " id "+ID_);
			//reassign (clear) the nn or cc at that id in livid, only if it has been assigned.
			if(ID_!=undefined && id!=ID_ && ID_>=0){ //we don't want to alert if the assignment is just a repeat of what's already here.
				if(livid[type][ID_].nn){
					livid[type][ID_].nn=127;
					var typefriendly = typehash[type];
					//log("reassigned",typefriendly,mode,val,"that was at ID",ID_);
					alert_panel("reassigned "+typefriendly+" "+mode+" "+val+" that was at ID "+ID_+" (LEDs must have unique MIDI assignments)");
					//paint the UI with a red highlight
					warnctl(pid,type+"_"+ID_);
				}
			}
			//reassign (clear) the note number sysex of notepvs:
			sx[CMD][notepvs]=127;
			//only now we can assign this note number to sx and to another id in livid.
		}
		//**done dealing with LED assignments
		
		//can only have one bank cycle button, so let's check if that's being assigned, and if it is, clear any pvs bankcycle assgn:
		if( type=="btn" && (param=="nn" || param=="mode") && (mode=="cc" || mode==1 || val=="cc") && (notepvs==126 || val==126) ){
			clog("BANKCYCLE "+id+" prev bc id "+bankcycle_id+" test "+(bankcycle_id!=id));
			if(bankcycle_id != "" && bankcycle_id!=id){
				//deassign the previous bank cycle id
				livid[type][bankcycle_id].nn=127;
				var typefriendly = typehash[type];
				alert_panel("reassigned "+typefriendly+" "+mode+" "+val+" that was at ID "+bankcycle_id+" (There can be only one bank cycle button)");
				warnctl(pid,type+"_"+bankcycle_id); //paint UI with red highlight
			}
			bankcycle_id=id;
		}
		
		//make sure what goes into the livid object is an integer!
		if( isNaN(parseInt(val)) ){
			val = nanhash[val];
		}
		if(typeof val=='boolean'){
			val = Number(val);
		}
		
		//assign value to parameter in livid object:
		clog("to livid type: "+type+" id: "+id+" param: "+param+" val: "+val);
		livid[type][id][param]=val;
		//update the controller:
		if(updatenow){
		  clog("updating controller");
			obToSx(cmds[type]);
			somesysex(cmds[type]);
			dumpmap();
		}
	}	
}

//set a global value, such as global.settingsch
//encspeedA, encspeedB, settingsch, ringlocal, btnlocal, omni, merge, enc_flip,bankch,bank,bankchs,colormap
function globl_set(){
	var a = Array.prototype.slice.call(arguments, 0);
	var param = a[0];
	var val = a.slice(1,a.length); //value is usually an int, but bankchs provides an array.
	//bankchs was originally delivered as an array in Max, but in browser, we set them individually
	//so we have to put the value we get in bankchs_<n> into an array:
	var bankscheck = param.split("_");
	if(param=="encspeedA" || param=="encspeedB"){
		clog("encspeed: "+val);
		val = nanhash[val];
	}
	if(bankscheck[0]=="bankchs"){
		param=bankscheck[0]; //set param to be "bankchs" so obToSx can do the right thing
		var ch_slot=parseInt(bankscheck[1]); //find out which slot this is
		var chsarray = [livid.globl.bankchs[0],livid.globl.bankchs[1],livid.globl.bankchs[2],livid.globl.bankchs[3]]; //clone this array into chsarray
		chsarray[ch_slot]=val; //put the value into the chsarray
		//log("CHS val "+val+" param "+param+" chsarray "+chsarray);
		val=chsarray; //turn val into an array so it will be properly dealt with a few lines down....
	}
	if(val.length==1){
		val = Number(val); //makes sure it is an int and not object, which screws things up when we generate Sysex.
	}
	livid.globl[param]=val; //....here!
	var thecmd = cmds.globl[param];
	clog("global: "+param+" val "+val+" cmd "+thecmd+" check "+livid.globl[param]);
	if(updatenow){
		if(thecmd)	
			obToSx(thecmd);
		if(param=='omni' || param=='btnlocal' || param=='btnlocal_mom' || param=='btnlocal_tog' || param=='ringlocal_abs' || param=='ringlocal_rel' || param=='ringlocal_slide' || param=='agslocal_fsr'){
			//clog("use settings ch");
			omniout();
			localout();
		}else if(param=='encdet_abs' || param=='encdet_rel'){
		  clog("encoder detent dummy");
		}else{
			clog("---global cmd out "+thecmd);
			cmdout(thecmd);
			if(param=="bank"){
				//request the settings on bank change
				//request_sched();
				request();
			}
		}
	}
}

//color map is pretty independent, so unlike globals and inspectors, we update the livid and sx objects at the same time 
function colormap_set(){
	//clog("colormap_set");
	var colors = [];
	var CMD = 34;
	var param = "colormap";
	var colorints = {"off":0,"red":1,"green":2,"yellow":3,"blue":4,"magenta":5,"cyan":6,"white":7};
	var a = $('#colormap').serializeArray();
	for(var i in a){
		var colorint = colorints[a[i].value]; //integer
		livid.colormap[i]=colorint;
		sx[CMD][i] = colorint;
		$('#color_'+i).css("background-color", bgcolors[colorint]);
	}
	var thecmd = cmds[param];
	cmdout(thecmd);
}

function ledlock(v){
	lock = v;
	var truth = v>0;
	//disable the note/mode interface in the inspector
	$('#ledsmidi').prop('disabled', truth);
	$('#ledsmode').prop('disabled', truth);	
}


function enc_flip(v){
	var msg = [];
	var CMD = cmds.globl.enc_flip; //55
	var curr_encflip = 1-Number(sx[CMD][0]>1);
	clog("enc flip called "+curr_encflip+" sx "+sx[CMD][0]);
	sx[CMD][0] = curr_encflip;
	msg = msg.concat(head,CMD,curr_encflip,eom);
	midi_o(msg);
	request();
}

function enc_det(v){
	var msg = [];
	var CMD = cmds.globl.encdet; //75
	var curr_abs = sx[CMD][0];
	var curr_rel = sx[CMD][1];
	clog("enc_det BEFORE "+v+" : "+curr_abs+" "+curr_rel+" sx "+sx[CMD][0]+" "+sx[CMD][1]);
	if(v=="abs"){
  	curr_abs = 1-Number(sx[CMD][0]>0);
  }
  if(v=="rel"){
  	curr_rel = 1-Number(sx[CMD][1]>0);
  }
  sx[CMD] = [curr_abs,curr_rel]
	clog("enc det AFTER "+v+" : "+curr_abs+" "+curr_rel+" sx "+sx[CMD][0]+" "+sx[CMD][1]);
	msg = msg.concat(head,CMD,sx[CMD],eom);
	midi_o(msg);
	//request();
}

//set on/off local colors, CMD76, new with DS1
var settinglocalcolor = false;
function localcolors(state){
  var tmpmsg = [];
  var CMD = cmds.globl.localcolor; //76
  var msgmid = (sx[CMD].length/2);
  var msgend = sx[CMD].length
  var oncolors = [];
  var offcolors = [];
  //on colors are the first half of CMD 76
  if(state){
    lividToSx[pid][4](); //gather current settings into sx[4]
    oncolors = sx[4];
    clog("SX4 "+sx[4]);
    clog("1 on colors "+oncolors);
    offcolors = sx[CMD].slice(msgmid,msgend-1); //for ds1, from 13 to 26
    clog("1 off colors "+offcolors);
  } else {
    var CMD = cmds.globl.localcolor; //76
    lividToSx[pid][4](); //gather current settings into sx[4]
    clog("SX4 "+sx[4]);
    oncolors = sx[CMD].slice(0,msgmid); //for ds1, from 0 to 12
    clog("0 on colors "+oncolors);
    var offcolors = sx[4];
    clog("0 off colors "+offcolors);
  }	
  var currentbank = 0;
  if(sx[26]){
    currentbank = sx[26];
  }
  sx[CMD] = tmpmsg.concat(oncolors,offcolors);
  tmpmsg = [];
  tmpmsg = tmpmsg.concat(head,CMD,currentbank,oncolors,offcolors,eom);
  midi_o(tmpmsg);
  var words = ["OFF","ON"];
  alertbox("Local Control colors for "+words[state]+" states have been applied.");
}

//$$ when a UI element is clicked, or the control's MIDI value is rec'd
//get the value for a control to update the interface
function getid(){ 
  clog("getid() "+requesting);
	if(!requesting){	
		var a = Array.prototype.slice.call(arguments, 0); //arg are sth like "btn_25" or "enc_7" 
		var p = a[0].split("_");
		var type = p[0];
		var id = parseInt(p[1]);
		undobuffer[0] = clone(livid[type][id]);
		clog("getid() type: "+type+" id: "+id);
		updatectlinspector(type,id);
	}	
}

var groups = {};
groups[2] = {};
groups[3] = {};
groups[4] = {};
groups[7] = {};
groups[8] = {};
groups[11] = {};
groups[12] = {};
groups[16] = {};
groups[17] = {};
//Ohm64
groups[2]['btn'] = { 'Grid':[0,63],'Crossfader Buttons':[64,65],'Slider Buttons':[66,73],'Function Buttons':[74,80] }; 
groups[2]['pot'] = { 'Left Knobs':[0,11],'Left Sliders':[16,19],'Right Knobs':[12,15],'Right Sliders':[20,23],'Crossfader':[24] };
groups[2]['led'] = { 'Grid':[0,63],'Crossfader':[64,65],'Slider Buttons':[66,73],'Function Buttons':[74,80] }; //we're not modifying these, so it's safe
//block
groups[3]['btn'] = { 'Grid':[0,63],'Function Buttons':[64,70] }; 
groups[3]['pot'] = { 'Knobs and Sliders':[0,9] };
groups[3]['led'] = { 'Grid':[0,63],'Function Buttons':[64,70] };
//Code
groups[4]['btn'] = { 'Encoder Buttons':[0,31],'Side Buttons':[32,36],'Bottom Buttons':[37,45] }; 
groups[4]['enc'] = { 'Encoders':[0,31] };
groups[4]['led'] = { 'Encoders':[0,31] };
groups[4]['ledring'] = { 'Encoders':[0,31] };
//OhmRGB
groups[7]['btn'] = { 'Grid':[0,63],'Crossfader':[64,65],'Slider Buttons':[66,73],'Function Buttons':[74,80] }; 
groups[7]['pot'] = { 'leftKnobs':[0,11],'leftSliders':[16,19],'rightKnobs':[12,15],'rightSliders':[20,23],'Crossfader':[24] };
groups[7]['led'] = { 'Grid':[0,63],'Crossfader':[64,65],'Slider Buttons':[66,73],'Function Buttons':[74,80] };
//CNTRLR
groups[8]['btn'] = { 'Grid':[0,15],'Top Row Buttons':[16,31],'Bottom Row Buttons':[32,47],'Encoder Buttons':[48,59] }; 
groups[8]['pot'] = { 'Knobs':[0,23],'Sliders':[24,31] };
groups[8]['enc'] = { 'Encoders':[0,11] };
groups[8]['led'] = { 'Grid':[0,15],'Top Row Buttons':[16,31],'Bottom Row Buttons':[32,47],'Encoder Buttons':[48,59] };
groups[8]['ledring'] = { 'Encoders':[0,11] };
//Alias8
groups[11]['btn'] = { 'Top Row Buttons':[0,7],'Bottom Row Buttons':[8,15] }; 
groups[11]['pot'] = { 'Knobs':[0,15], 'Sliders':[16,24], 'Master Fader':[25] };
groups[11]['led'] = { 'Top Row Buttons':[0,7],'Bottom Row Buttons':[8,15] };
//Base
groups[12]['btn'] = { 'Pads':[0,31],'Side Buttons':[32,39],'Side Corner LEDs':[40,47],'Touch Buttons':[48,55],'Top Corner LEDs':[56,63] }; 
groups[12]['fsr'] = { 'Pads':[0,31] };
groups[12]['led'] = { 'Pads':[0,31],'Side Buttons':[32,39],'Side Corner LEDs':[40,47],'Touch Buttons':[48,55],'Top Corner LEDs':[56,63] };
groups[12]['slide'] = { 'Sliders':[0,8] };
//DS1
groups[16]['btn'] = { 'Channel Buttons':[0,15],'Master Buttons':[16,24],'Encoder Buttons':[25,28] }; 
groups[16]['pot'] = { 'Ch1':[0,5], 'Ch2':[6,11], 'Ch3':[12,17], 'Ch4':[18,23], 'Ch5':[24,29], 'Ch6':[30,35], 'Ch7':[36,41], 'Ch8':[42,47], 'Master and External':[48,53] };
groups[16]['led'] = { 'Channel Buttons':[0,15],'Master Buttons':[16,24],'Encoder Buttons':[25,28] }; 
groups[16]['enc'] = { 'Encoders':[0,3] };
//BaseII
groups[17]['btn'] = { 'Pads':[0,31],'Side Buttons':[32,39],'Side Corner LEDs':[40,47],'Touch Buttons':[48,55],'Top Corner LEDs':[56,63] };
groups[17]['fsr'] = { 'Pads':[0,31] };
groups[17]['led'] = { 'Pads':[0,31],'Side Buttons':[32,39],'Side Corner LEDs':[40,47],'Touch Buttons':[48,55],'Top Corner LEDs':[56,63] };
groups[17]['slide'] = { 'Sliders':[0,8] };

function group(type,g_id){
		clonesx(); //copy the sx object to a clone so we can undo.
		var limit=1000; //artificially high id limit. means "no limit".
		if(type=="btn" && pid==4){
			limit=32;
		}
		var basis = livid[type][g_id]; //an alias
		//first check if this is going to result in assignments:
		var validgroup=1;
		var idmin = 0;
		var idmax = limit;
		var subgroup = type;
		var basismode = livid[type][g_id].mode; //note or cc
		var led_too = (type=="btn" && lock>0); //should we do the LED assignments, too?
		var skip_led_nn = (type=="led" && lock>0); //if lock is on, and group is pressed in LED panel, we don't want to change the note number
    //figure out the limits of the group
    for (var g in groups[pid][type]){
      for(p in groups[pid][type][g]){
        var gmin = groups[pid][type][g][0];
        var gmax = groups[pid][type][g][1];
        if(g_id>=gmin && g_id<=gmax){
          idmin = gmin;
          idmax = gmax;
          subgroup = g;
        }else{
          alert_panel("Group values problem");
        }
      }
    }
    var isspecial=false;
		for(var id in livid[type]){
		  //clog("group "+id+" type "+type);
			if(id>=idmin && id<=idmax){
				for (var p in livid[type][id]){
					if( p=="nn" || p=="cc"){
					  if(!skip_led_nn){
              if(p=="cc") {
                status=p; //status for the alert popup if needed
    					  isspecial = livid[type][id][p]>120; //mmc, bank, enc speed, indiv-bank should be left out of the group assignments
              }
              var val = parseInt(basis[p])-(g_id-parseInt(id));
              if(!isspecial){
                livid[type][id][p]=val; //so if nn is 30, g_id is 4, id0 gets (30-(4-0))=26,id1 gets (30-(4-1))=27,...,id8 gets (30-(4-8))=34 
                if(livid[type][id][p].mode){
                  livid[type][id][p].mode = basismode;
                }
                if(led_too){
                  livid["led"][id][p]=val;
                  livid["led"][id].mode = basismode; //copy the mode, too.
                }
              }
              if(livid[type][id][p]>127) validgroup = 0;
					  }
					}else{
						livid[type][id][p]=basis[p]; //ch and mode are copied
						//clog("...type "+type+" p "+p+" ob "+livid[type][id][p]);
					}
				}
			}
		}
		if(validgroup){
			var thecmds = cmds[type].slice(0);
			if(led_too){
				thecmds = cmds[type].concat(cmds["led"]);
			}
			obToSx(thecmds);
			somesysex(thecmds);
			dumpmap();
			alert_panel("Group values assigned to "+subgroup);
		}else{
			alert_panel("At least one group value exceeds max "+status+" number. Group not assigned.");
			revertsx();
		}	
}

//-----------TURN VALUES FROM livid OBJECT INTO SYSEX--------------------------------

//convert values in livid object into sysex strings (sx arrays)
function obToSx(){
	//function has optional arguments to only call some of the lividToSx functions
	var cmds;
	if(arguments){
		cmds = Array.prototype.slice.call(arguments, 0); //e.g. [10,11,12]
		if(cmds.length==1) cmds = cmds[0]; //flatten
		clog("obtosx cmds "+cmds);
		for(var i=0;i<cmds.length;i++){
			var thefcn = Number(cmds[i]);
			if(lividToSx[pid][thefcn])
				lividToSx[pid][thefcn]();
		}
	}else{ //refresh all
		for(var i in lividToSx[pid]){
			if(lividToSx[pid][i])
				lividToSx[pid][i]();
		}
	}
}
function colormapper(CMD){
	for (var i in livid.colormap){
		sx[CMD][i]=livid.colormap[i];
	}
}
//used for converting livid object to Sysex for cmds 35 and 36
function ledmapper(CMD,ctl,p){
	//clog("LED cc "+sx[36]);
	//clog("ledmapper "+CMD+" "+ctl+" "+p+" len "+sx[CMD].length);
	//first, use the undo buffer that is created in the UI() to determine what note or cc# is being used:
	var nncheck=undothis[0][2];
	var crcheck=sx[CMD][nncheck]; //what cr is at this note or cc #?
	//need to find the ID that has this nn/cc assigned to it:	
	for (var id in livid[ctl]){ 
		var cr;
		var nn = livid[ctl][id][p]; //note or cc number at, e.g. livid.led.48.nn
		var mode = livid[ctl][id].mode;
		if(id != "undefined"){
      if (ctl=="ledring" && has_ledring){
        var offset;
        switch(pid){
          case 4:
          offset = 45;
          var id_= parseInt(id)+offset;
          cr = IDtocr[pid][id_];
          break;
          case 8:
          offset = 60;
          cr = parseInt(id)+offset//simple offset for LED rings
          break;
          case 12:
          offset = 32; //base
          cr = parseInt(id)+offset;//simple offset for LED rings
          break;
        }
      }else{
        cr = IDtocr[pid][id];
      }
      //clog("CC LED id "+id+" cr "+cr+" mode "+mode+" note# "+nn);
		}
		if(mode==0 && CMD==35){
			//**probably don't need to do this check
			//see if the cr is used in the sx[CMD], and if it is, assign that spot cr code 127 (unassigned)
			//var check=sx[CMD].indexOf(cr);
			//post("\ncheck CR:",CR,"index",check);
			//if(check>0) sx[CMD][check] = 127;
			//**END probably don't need this
			//clog("LED note "+nn+" cr "+cr+ " id "+id);
			sx[CMD][nn] = cr; //put the cr code at the note position
			var otherCMD = 36;
			var deassign = 127;
			sx[otherCMD][nn] = 127; //deassign the corresponding CC so the LED doesn't respond to both note and cc
		}
		if(mode==1 && CMD==36){
			//**probably don't need this
			//see if the cr is used in the sx[CMD], and if it is, assign that spot cr code 127 (unassigned)
			//var check=sx[CMD].indexOf(cr);
			//if(check>0) sx[CMD][check] = 127;
			//**END probably don't need this
			sx[CMD][nn] = cr; //put the cr code at the cc position
			var otherCMD = 35;
			var deassign = 127;
			sx[otherCMD][nn] = 127; //deassign the corresponding note so the LED doesn't respond to both note and cc
		}
	}
	//log("ledmapper end "+CMD+" "+ctl+" "+p+" len "+sx[CMD].length);
}
//for single byte sysex messages
function getone(cmd,p,dosub){ //for channels, we need to subtract 1 before we turn it into sysex: display is 1-16, but machine wants 0-15.
	//clog("getone"+" "+cmd+" "+p+" "+dosub);
	var oset=0;
	if(dosub==undefined) oset=0;
	else oset = dosub;
	var ctl = "globl";
	var val=livid[ctl][p]-oset;
	if(p=="settingsch"){
		val = livid.globl.settingsch * livid.globl.settingsch_enable;
		if(val>0) val = val -1;
	}
	sx[cmd][0]=Number(val);
}
//for commands that use 2 bytes to describe midi settings note number and mode for a control.
function bytemaps(c,t,p){ //sysex command #, node of livid object, like btn, pot, fsr, enc, etc.
	var CMD=c;
	var type=t;
	var prm="nn";
	if(p) prm=p;
	//clog("bytemap "+CMD+" t "+type+" p "+prm);
	for (var id in livid[type]){
		var b2 = livid[type][id].mode; 
		var b1 = livid[type][id][prm];
		var bytei=id;  //byte index: position in sysex string
		if(type=="btn" || type=="led"){
			bytei=ipos[pid].btn[id];
		}else{
			bytei=ipos[pid][type][id];
		}
		var j=Math.min(bytei*2); //just even positions in sx string
		//fill up the sx array for CMD:
		sx[CMD][j]=b1;
		sx[CMD][j+1]=b2;
	}
}

function omniout(){
	var ch = (livid.globl.settingsch)-1;
	var omni = livid.globl.omni;
	sendmidi(176+ch,124+omni,0); //176 124 0 is off 176 125 0 is on
}
//security bit,btn momentary local,btn toggle local,enc abs local,enc rel local,(reserved)
function localout(){
	var localcc = 122;
	var ch = (livid.globl.settingsch)-1;
	if(!is_base){
		localflags[1] = livid.globl.btnlocal_mom; //btn momentary
		localflags[2] = livid.globl.btnlocal_tog; //btn toggle 
		localflags[3] = livid.globl.ringlocal_abs; //enc absolute
		localflags[4] = livid.globl.ringlocal_rel; //enc relative (+/-)
		localflags[5] = livid.globl.agslocal_pot; //analog local
		localflags[6] = livid.globl.agslocal_fsr; //analog local
	}else{
		localflags[0] = 1; //security bit - must be 1 to accept
		localflags[1] = livid.globl.btnlocal_mom; //btn momentary
		localflags[2] = livid.globl.btnlocal_tog; //btn toggle 
		localflags[3] = livid.globl.ringlocal_slide; //touch fader
		localflags[4] = 0; //livid.globl.ringlocal_cbtn: cap button (deprecated)
		localflags[5] = livid.globl.agslocal_fsr; //analog local for aftertouch
		localflags[6] = livid.globl.agslocal_fsr; //analog local for notes
	}
	var local = btod(localflags);
	clog("local out "+localflags+" byte "+local);
	sendmidi(176+ch,localcc,local);
}

//dump all sysex out to controller all at once.**NOT USED
function sysexout(){
	//$.post("../index.html", "json_in sysex " +  JSON.stringify(sx) ); //to max
	//log("all sysex stringified to max");
	//omni and local ctl are sent as cc's according to MIDI spec
	omniout();
	localout();
}

var cnxn;
var sxtosend = []; //the array of sysex cmd numbers we're going to send. a full dump just clones sx_send[pid] to this array
var isfromfile = false;
//sends out some sysex commands, based on the cmd #s in the arguments.
function somesysex(){
	//disconnect the MIDI input for Safari- there seemed to be some sort of problem with leaving it connected during this routine:
	if(DO_DISCNXN) disconnectMidiIn();
	var LEDcmd = 4;	
	//request the current LED state
	/*
	var reqled = []
  reqled = reqled.concat(head,7,LEDcmd,eom);
  midi_o(reqled);
  */
	cmdno=0;
	var theargs = [];
  var tmp = [];
	theargs=Array.prototype.slice.call(arguments, 0); //e.g. [10,11,12]
	if(theargs.length==1){ //flatten the sxtosend array
		theargs = theargs[0];
	}
	//copy the array so we don't alter the object passed this function:
	for(var i=0;i<theargs.length;i++){
	  sxtosend[i]=theargs[i];
	  //clog("sxtosend "+i+" : "+sxtosend[i]);
	}
	clog("somesysex() "+sxtosend+" reps "+sxtosend.length+" current bank "+sx[26]);
	var sxmsg=[];	
  var bank_no = sxtosend.indexOf(26);
  var chan_no = sxtosend.indexOf(22);
  var chans_no = sxtosend.indexOf(23);
  clog ("bank and ch command indices "+bank_no+" "+chan_no+" "+chans_no);
  //send the bank number first CMD 26
	if(bank_no>0){
    midi_o(tmp.concat(head,26,sx[26],eom));
	  sxtosend.splice(bank_no,1);
  }
  //remove CMD 22 "set bank channel" if there's also CMD 23 since that is redundant of 23 "set all bank chs"
	if(chan_no>0 && chans_no>0){
	  sxtosend.splice(chan_no,1);
  }
	for(var i=0;i<sxtosend.length;i++){
		var cmd = sxtosend[i];
		var oldledstyle = ( (OHM64 || BLOCK) && (cmd==35 || cmd==36) ); //leds on ohm64 and block are handled differently
		//check if the cmd number is in the sx_send array for this product. For example, we don't want to try to send 54 to CNTRL:R, because it doesn't reply to that. :
		//clog("-----cmd "+cmd+" msg "+sx[cmd]);
		if(sx_send[pid].indexOf(cmd) >= 0){
			if(!oldledstyle){
				tmp = [];
				sxmsg[i] = tmp.concat(head,cmd,sx[cmd],eom) //e.g., the entire sysex string for commands 10, 11, and 12
				//clog("somesysex() "+sxmsg[i]);
				if(sxmsg[i]){
          midi_o(sxmsg[i]); //midi out function in midiio.js
				}
			}else{
				oldleds(cmd);
			}
		}
	}
	/*
	(function(){
    var i = 0;
    var looper = function(){
        //console.log('CMD ID: ' + requests[pid][i]);
        if (i < sxtosend.length) {
          if(sxmsg[i]){
            midi_o(sxmsg[i])
          }
          i++;
        } else {
          console.log('Loop end.');
          return;
        }
        setTimeout(looper, 1000);
    };
    looper();
    })();
	*/
	clog("LED MAP AGAIN "+sxtosend.indexOf(35)+" "+sxtosend.indexOf(36));
	//for whatever reason, we need to send 35 and 36 again, something to do with the order of 16, 35, & 36
	var recmd = 35;
  if(sxtosend.indexOf(recmd) >= 0){
    tmp = [];
    tmp = tmp.concat(head,recmd,sx[35],eom) 
    midi_o(tmp); //midi out function in midiio.js
  }
  recmd = 36;
  if(sxtosend.indexOf(recmd) >= 0){
    tmp = [];
    tmp = tmp.concat(head,recmd,sx[36],eom)
    midi_o(tmp); //midi out function in midiio.js
	}
	if(sxtosend.indexOf(LEDcmd) >= 0){
    tmp = [];
    clog("_____SENDING LIGHTS LAST____");
    midi_o( tmp.concat(head,LEDcmd,sx[LEDcmd],eom) );
  }
	if(DO_DISCNXN) cnxn = setTimeout(function(){ connectMidiIn() },500); //re-open the MIDI input port
  isfromfile = false;
}

//convert cmds 35 and 36 to cmd 9 for ohm64 and block
function oldleds(cmd){ //cmd will be 36 or 35
	//log("old led style");
	var nn,type,cr;
	var ledsysex = [];
	type = cmd-35; //0=note, 1=cc
	//break down the arrays in sx[35] and sx[36] 
	for(var i=0;i<sx[cmd].length;i++){
		nn = i;
		cr = sx[cmd][i];
		var tmp = [];
		ledsysex[i] = tmp.concat(head,9,nn,type,cr,eom);
	}
	//dump the leds to CMD 9 on a timed schedule. 
	var j=0;
	var interval = setInterval(function() { 
						midi_o(ledsysex[j]);
						//log("led "+j+" len "+ledsysex.length+" out "+ledsysex[j]);
						j++; 
						if(j >= ledsysex.length) clearInterval(interval);
                   }, 30);
}

//send a single sysex command. special case: use the argument "inquiry" to send the inquiry sysex message to the controller
function cmdout(){
	var cmd = Array.prototype.slice.call(arguments, 0);
	cmd = cmd[0]; //"flatten" it
	var midiout=[];	
	//clog("cmdout "+" cmd "+cmd);
	//now that we know the cmd number of the sysex string,
	//we can use that to output midi:
	if(cmd=="inquiry"){
		midiout = inquiry;
	}else{
		if(requesting){
			//req_max=requests[pid][ (requests[pid].length-1) ]; //last reqID
			//alert_panel("Requesting: "+cmdfriendly[cmd]);
			midiout = midiout.concat(head,7,cmd,eom);
		}else{
			midiout = midiout.concat(head,cmd,sx[cmd],eom);
			//log("cmdout "+midiout);
		}
	}
	//$.post("../index.html", "json_in sysex " +  JSON.stringify(midiout) ); //to max
	midi_o(midiout); //midi out function is in midiio.js
}
//------------------------------------------------------------------------------------------------

//-----------GET VALUES FROM SYSEX AND PUT THEM IN livid. OBJECT--------------------------------

var sysexbuffer = new Array();
var issysex = false;
var pvsID=-1;

//called from midiio.js. Processes incoming sysex messages to populate the 'livid' object. Not used much, though as we are using the function queryd() to process
//accummulated sysex
//Also detects a response to inquiry so we know what controller is loaded and can setup the interface accordingly.
function procSysex(){
		var blockhedge; //will be used for a setTimeout as a way to deal w/ some blocks having expansions, others not. declare here so we can cancel it later.
		var sysexb = Array.prototype.slice.call(arguments, 0); //a full sysex message
		if(sysexb.length==1){
			sysexb=sysexb[0];
		}
		var isLivid=1;
		//test the buffer to make sure it is a Livid sysex:
		for(var i=0;i<head.length;i++){
			if(sysexb[i] != head[i]){
				isLivid=0;
			}
		}
		//if it's a Livid brand controller, then lets snip out the important parts and put it in the right place:
		if(isLivid){
			var IDat=5; //CMD id is at this index in the array
			if(sysexb.length>5 && sysexb[IDat]!=7){ //7 is a "request" command and shouldn't be considered
				var sxid=sysexb[IDat]; //returns the ID of the command, e.g. sx.Map Buttons is 11, Map Analogs is 10
				var bytestring = sysexb.slice(IDat+1,sysexb.length-1); //the sysex message without the "head" (240 ... CMDID) or end of message (247) bytes.
				if(sxid != 9){ //9 is the 'single led map' of OHM64 and BLOCK
					sx[sxid]=bytestring; //store the string in our sx object
				//ohm64 and block have a different way of dealing with LEDs:
				}else{ //our bytestring is a triad: <nn> <note or cc> <cr> e.g. 2 0 66 is note 2 at CR 66
					//for Ohm64 and block, we create CMD 35 and 36 from the results of 9
					if(!sx[35] || !sx[35]){
						sx[35]=[1];
						sx[36]=[1];
					}
					var nn=bytestring[0];
					var cr = bytestring[2]
					if(bytestring[1]==0){ //notes
						sx[35][nn] = cr;
					}else{ //cc
						sx[36][nn] = cr;
					}
				}
				if(requesting && !timedreq){
					if(blockhedge){ //blockhedge: hedges the bet that this block has expansion jacks.
						clearTimeout(blockhedge); //if we do get a response to cmd 33, then we need to cancel this scheduled process.
					}
					req_max=requests[pid][ (requests[pid].length-1) ]; //last reqID
					clog("req_max "+req_max+" id "+sxid);
					if(sxid==req_max){
						endrequests();
					}
				}
				if(sxid==ACK){
					clog("ACK rec'd");
					if(resetting_defaults){
					  request();
					  resetting_defaults = false;
					}
					notify("ACK");
				}
				if(sxid==NACK){
					alert_panel("Transmission error - start again");
				}
				if(sxid==BANKIN){
					var bankin = sx[sxid];
					changebank(bankin);
					alert_panel("Bank Change in from controller "+bankin);
				}
				//if we're not in the request loop and the sysex description of LED states comes in, lets update the livid object
				if(!requesting && (sxid==4 || sxid==31) ){
				  clog("LED update "+sxid+ " "+sx[sxid]);
				  sxToObj[pid][sxid]();
				}
			}
			if(requesting && !timedreq){ //handshake method - use the ack to trigger the next request
				cmdno++;
				var req=requests[pid][cmdno];
				if(BLOCK && req==33){ //we may not get a response for this because the block may not have expansion jacks
					blockhedge = setTimeout(function(){ endrequests() },500);
				}
				//clog("next "+req+" - "+pid+" - "+cmdno);
				if(!req){ //protection against a problem where it can go to req's out of bounds. not sure why it does this...must track down.
					clog("undef request");
					endrequests();
				}else{
					var output = setTimeout(function(){ cmdout(req) },REQSCHED); //schedule the next one. Mostly need to do this for Safari - Chrome seems ok w/ faster tx.
				}
			}
		}else{
			//test to see if this is a response identifying the controller [240,126,ch,6,2,0,1,mfg,1,0,pid,0,v1,v2,v3,v4];			
			if(sysexb.length==tomatch.length){
				var isLividCtl = 0;
				for(var i=0;i<sysexb.length;i++){
					if(i!=2 && i!=10 && i!=12 && i!=13 && i!=14 && i!=15){
						isLividCtl = Number(sysexb[i] == tomatch[i]);
					}else{
						pid = sysexb[10];
						firmware = sysexb.slice(12,sysexb.length-1);
						firmware_sym = firmware[3]+"."+firmware[2]+"."+firmware[1]+"."+firmware[0];
						firmware_float = Number( firmware[3]+"."+firmware[2]+firmware[1]+firmware[0] );
						
						clog("FIRMWARE RAW: "+firmware)
						
						var oldohm = ((pid==7) && (firmware[0] <= 5 && firmware[1] <= 5 && firmware[2] == 0 && firmware[3] == 0) );
						//var oldcode= blah;
						var oldcntrlr=((pid==8) && firmware[2] < 1 );
						//clog("OLD? "+oldcntrlr+" firmw "+firmware);
						if(oldohm || oldcntrlr){
							firmware_old = true;
						}
					}
				}
				var notes = ["This is not a Livid Controller", "This is a Livid "+products[pid]+"<br>firmware rev: "+firmware_sym];
				alert_panel(notes[isLividCtl]); 
				var fwspan = document.getElementById("firmware");
				fwspan.innerHTML = "<i>"+products[pid]+" v. "+firmware_sym+"</i>";
				//if it is a livid controller, call the "product" function which sets up the interface with function "beginfaceplate()" (in faceplate.js)
				//and then sends all the requests to the controller to get all its settings.
				if(isLividCtl){
					product(pid);
				}
			}
		}
}

function endrequests(){
		//alert_panel("Settings requests complete");
		isnotcurfw();
		$('#fetchsettings').fadeOut(200);
		clog("SETTINGS REQUEST IS DONE ");
		//convert sysex to livid object when the request is finished.
		clonesx(); //copy the sx object to a clone so we can revert.
		toobj();
		clog("CURRENT BANK "+sx[26]);
		requesting = 0;
		masterreq = 0; //for displaying MIDI data at startup.
		setTimeout(function(){viewmidi("-------------")},SCHED);
}

var cmdno=1;
var timedreq=0;
function inquire(){
	clog("INQUIRE BEGIN");
	cmdno=0;
	requesting = 1;
	masterreq = 1; //for displaying MIDI data at startup.
	cmdout("inquiry"); //sends inquiry sysex to find out the type of Livid controller on the current port
}

//------------------------------------------------------------------------------------------
//dump all requests at once method:
var qreq = '';
function request(){
	//close the port so we can...
	Jazz.MidiInClose(); 		
	//...open up the port with no callback function so we can use QueryMidiIn()
	Jazz.MidiInOpen(inports.options[inports.selectedIndex].value);
	clog("BEGIN REQUESTS ROUTINE");
	requesting = 1;
	queryd();
	var reqi=0;
	clog("requests "+requests[pid]);
	qreq=setInterval(function(){     // start the polling cycle
		var req=requests[pid][reqi];
		reqi++;
		if(req){
			clog("->REQ "+req+' i '+reqi);
			cmdout(req);
		}
	},SCHED);
	//delay the cleanup by the correct amount:
	//var delay = 30*SCHED*(requests[pid].length+1);
	//if(SAFARI) delay = delay/8; //sched is 10x longer for safari, so we need to shorten the delay
	//clog("query done delay "+delay);
	//setTimeout(function(){qdone()},delay);
}

//process the responses from requests which are stored in a buffer by Jazz Midi plugin. not using procSysex much
var sxb=[];
var qproc = '';
var ID = 0;
function queryd(){
	qproc=setInterval(function(){     // start the polling cycle
		var arr;
		while(arr=Jazz.QueryMidiIn()){  // while the queue is not empty
			var IDat = 5;
			var ts = arr[0];            // the first element is the time stamp
			var msg = arr.slice(1,arr.length); // the rest is the message
			var last = msg[msg.length-1];
			if(msg[0] == 240){
				sxb=[];
				ID = msg[IDat];
			}
			sxb=sxb.concat(msg);
			if(last == 247){
				var bytestring = sxb.slice(IDat+1,sxb.length-1);
				if(ID!=9){
					//sx[ID] = sxb.slice(0);
					sx[ID] = bytestring;
					//clog("ID "+ID+" sx "+sx[ID]);
					//viewmidi("-"+ID+": "+sx[ID]);
					viewmidi("get "+cmdfriendly[ID]+" ("+ID+")");
				}else{
					//for Ohm64 and block, we create CMD 35 and 36 from the results of 9
					if(!sx[35] || !sx[35]){
						sx[35]=[1];
						sx[36]=[1];
						var nn=bytestring[0];
						var cr = bytestring[2]
						if(bytestring[1]==0){ //notes
							sx[35][nn] = cr;
						}else{ //cc
							sx[36][nn] = cr;
						}
					}
				}
			}
			//clog("time "+ts+" sx "+msg);
			//check to see if this is the last request:
		  var thelast = requests[pid][requests[pid].length-1] == ID;
		  if(BLOCK){
		    if (ID==13){
          setTimeout(qdone(),1000);
		    }
		  }
		  if(OHM64){
		    if (ID==15){
          setTimeout(qdone(),1000);
		    }
		  }
      if(thelast && !OHM64 && !BLOCK){
        clog("Last Request rec'd "+ID);
        setTimeout(qdone(),10);
      }
		}
	},0);
	
}

function qdone(){
	clog("................................. req done");
	for(i in sx){
		clog(">> "+i+" sx "+sx[i]);
	}
	clearInterval(qreq);
	clearInterval(qproc);
	//fix any sysex messages that split up over 2 timestamps
	/*
	for(t in sxb){
		var last = sxb[t][ sxb[t].length-1 ];
		var first = sxb[t][0];
		if(first!=240 || last!=247){
			sxb[t]=sxb[t].concat(sxb[Number(t)+1]); //merge with the next one
			//clog("fixed "+ sxb[Number(t)+1]);
			delete sxb[Number(t)+1]; //delete it
		}
		//clog("t "+t+" sx "+sxb[t]);
	}
	//cleanup:
	for(t in sxb){
		var IDat=5; //CMD id is at this index in the array
		var sxid=sxb[t][IDat]; //returns the ID of the command, e.g. sx.Map Buttons is 11, Map Analogs is 10
		clog("settings: "+sxid+" msg "+sxb[t]);
		var bytestring = sxb[t].slice(IDat+1,sxb[t].length-1); //the sysex message without the "head" (240 ... CMDID) or end of message (247) bytes.
		if(sxid != 9){ //9 is the 'single led map' of OHM64 and BLOCK
			sx[sxid]=bytestring; //store the string in our sx object
		//ohm64 and block have a different way of dealing with LEDs:
		}else{ //our bytestring is a triad: <nn> <note or cc> <cr> e.g. 2 0 66 is note 2 at CR 66
			//for Ohm64 and block, we create CMD 35 and 36 from the results of 9
			//log("bytestring "+bytestring);
			if(!sx[35] || !sx[35]){
				sx[35]=[1];
				sx[36]=[1];
			}
			var nn=bytestring[0];
			var cr = bytestring[2]
			if(bytestring[1]==0){ //notes
				sx[35][nn] = cr;
			}else{ //cc
				sx[36][nn] = cr;
			}
		}
	}
	*/
	endrequests();
	//close the port so we can...
	Jazz.MidiInClose(); 		
	//...open up the port with callback function
	connectMidiIn()
}

//------------------------------------------------------------------------------------------

//request(): dump all sysex requests via handshake with request
function request_handshake(){
	//clog("REQUEST BEGIN",requests[pid].length);
	cmdno=0;
	requesting = 1;
	var req=requests[pid][cmdno];
	//cmdout(req);
	//cmdout("inquiry")
	//setTimeout(function(){cmdout("inquiry")},SCHED);
	setTimeout(function(){cmdout(req)},SCHED);
}
/*
//timed dump of requests. better get that interval in setInterval right!! kinda hacky, but it works.
var sched_req=0;
var cmdi=0;
function req_sched(){
	clearInterval(sched_req);
	cmdi=0;
	requesting = 1;
	timedreq=1;
	req_max=requests[pid][ (requests[pid].length-1) ]; //last reqID
	sched_req=setInterval(function(){req_next()},SCHED);
}
//used in a scheduled request
function req_next(){
	var req=requests[pid][cmdi];
	clog("REQ dump "+req+" of "+req_max);
	cmdout(req);
	cmdi++;
	if(req==req_max){
		clearInterval(sched_req);
		cmdi=0;
		requesting = 0;
		timedreq=0;
		//log("REQUEST COMPLETE");
		var find_livid = setTimeout(function(){cmdout("inquiry")},SCHED);
		var sched_toobj=setTimeout(function(){toobj()},SCHED*2); //delay the execution so the last of the requests can finish.
		//toobj();
	}
}
*/
function clone(ob){
	var cloned = {};
	//post("\ncloning",ob);
	for (var i in ob){
		//post("\n...",i,ob[i]);
		cloned[i] = ob[i];
	}
	return cloned;
}
function clonesx(){
	for (var i in sx){
		sx_clone[i] = [];
		for(var j in sx[i]){
			sx_clone[i][j] = sx[i][j];
		}
	}
}
//revert settings to the last time settings were requested (at startup)
function revertsx(){
	for (var i in sx_clone){
		for(var j in sx_clone[i]){
			sx[i][j] = sx_clone[i][j];
		}
	}
	//dump it all
	sysexout();
}

function toobj(){
	clog("Making objects & UI from sysex data");
	//convert the rec'd sysex into livid object, using functions in sysexToLivid.js
	for(i in sxToObj[pid]){
		if(i!="name"){ 
			sxToObj[pid][i]();
		}
	}
	requesting = 0;
	globalsToUI(); //put globl object values into UI
	colormapToUI(); //put color map values into UI
	//outlet(3,"done");
	clog("to obj: done");
	dumpmap(); //makes map to interpret MIDI input for UI control
	//log("toobj: product # "+pid+" ");
	//selects the first button
	var firstbtn="btn_0";
	if(BASE || BASEII) firstbtn="btn_48";
	selctl(pid,firstbtn); //in faceplate.js
	inittabs();
	getid(firstbtn);
	//log("CH: "+livid.globl.bankch);
}

//update the UI for the various "global" values
function globalsToUI(){
	var ctl,val
	//clog("-->UI for globals");
	for(param in livid.globl){
		if(typeof livid.globl[param] == "object" ){ //only bank channels are reported as an array
			for(var i in livid.globl[param]){
				//clog("globalsToUI "+param+" i "+i+ " val "+livid.globl[param][i]);
				ctl=param+"_"+i;
				val=livid.globl[param][i];
				updateglobalinspector(ctl,val)
			}
		}else{
      //clog("globalsToUI "+param+" val "+livid.globl[param]);
			ctl=param;
			val=livid.globl[param];
			updateglobalinspector(ctl,val)
		}
	}
	val=(livid.globl.settingsch<16);
	ctl="settingsch_enable";
	//outlet(1,"script","send",ctl,"set",val);	
	updateglobalinspector(ctl,val)
}

function colormapToUI(){
	if(has_rgb){
	for(var i=0;i<livid.colormap.length;i++){
		var index = livid.colormap[i];
		var thesetting = colorhash[index];
		$('#color_'+i).val(thesetting);
		$('#color_'+i).css("background-color", bgcolors[index]);
	}
	}
}

 //for globl commands where only one byte is of interest
function mapone(cmd,p,val,dosub){
	var oset=0;
	if(dosub==undefined) oset=0;
	else oset = dosub;
	var ctl = "globl";
	var theval = val+oset;
	if(!livid[ctl][p]) livid[ctl][p]
	livid[ctl][p] = theval;
	if(p == "settingsch"){
		livid.globl.settingsch_enable = Number(livid.globl.settingsch>0)
	}
}

//this routine is common for all the maps that use 2 bytes per control to describe note num and mode 
//called from sysexToLivid.js
function mapbytes(cmd,ctl,p){ //ctl is btn, pot, led, etc.
	var prm = "nn"; //parameter - usually "nn" but for fsr, we need "cc" too.
	if(p){
		prm = p;
	}
	//clog("map "+cmd+" "+ctl+" param "+prm+" sx "+sx[cmd]);
	
	for(var i in sx[cmd]){
		var j=Math.floor(i/2); //each ID has a pair associated
		var id_=posi[pid][ctl][j]; //get the ID from the posi table for this product/control combo
		var val=sx[cmd][i]; //value of the byte
		if(!livid[ctl][id_]) livid[ctl][id_]={}; //make it if it's not here
		if(i%2){ //odd numbered bytes are mode
			livid[ctl][id_]["mode"]=val;
			//if(ctl=='enc') clog("map mode "+val+" to id "+id_+" at index "+j);
			//now that we have the nn and mode, we can check if it's special:
			if(cmd==11){
				livid[ctl][id_]["isbank"] = Number(livid[ctl][id_]["nn"]==126 && livid[ctl][id_]["mode"]==1);
				livid[ctl][id_]["isencspeed"] = Number(livid[ctl][id_]["nn"]==127 && livid[ctl][id_]["mode"]==1);
				//log("\nisbank",id_,livid[ctl][id_]["nn"]==126, livid[ctl][id_]["mode"]==1,livid[ctl][id_].isbank);
			}
		}else{
			livid[ctl][id_][prm]=val;
			//if(ctl=='enc') clog("map nn "+val+" to id "+id_+" at index "+j+" param "+prm);
		}
	}
}
//called from sysexToLivid.js
function color_map(cmd){
	for(var i in sx[cmd]){
		livid.colormap[i] = sx[cmd][i];
	}
}

function changebank(b){
	livid.globl.bank = b;
	request();
}

//------------------------------------------------------------------------------------------------


//------------

//----PRESETS--------------------------------------------------------------------------------------------
/*
server side storage - maybe store the JSON in a MongoDB. 
Can use MongoDB on dreamhost server with sleepy.mongoose for REST API, but probably easier to start with a free, ltd., mongolab.
Presets can't be "private". The REST api is very insecure - if someone gets the API key, they can read/write to the DB, too!
Presets can be tagged with info.
Maybe set a cookie that stores default tag that is user's IP in MD5 - that we can easily retrieve the presets if there's no username.

*/
	
function writedump(p){
    var tojson,fout,filepath;
    if(p) {
		filepath = p;
    }else{
    	filepath = max.apppath+"/LividPreset";
    }
    log("\nwritedump to",filepath);
    var namesplit = filepath.split("/");
    sx.name = namesplit[namesplit.length-1];
    sx.id = pid;
    sx.mfg = mfg;
    
    tojson = JSON.stringify(sx,null,'\t'); //function is defined in separate file JSONparse
    
    fout = new File(filepath,"write","TEXT");
    if (fout.isopen) {
        fout.eof = 0;
        //fout.writeline(tojson);
        var len = tojson.length;
        log("\nlen",len);
        var lim = 16000; //artificial limit. true limit is 32K, but just want to be sure.
        if(len>lim){
            var i=0;
            var breaks = Math.floor(len/lim);
            for (i=0;i<breaks;i++){
                var cin=i*lim;
                var cout = ((i+1)*lim);
                //log("\nbreaking",i,len,lim,cin,cout);
                fout.writestring(tojson.substring(cin,cout));
            }
            //if the length is not a multiple of 16K, which it probably is not, we need to:
            if(breaks<len/lim){
                var theend = (breaks)*lim;
                var therest=len-theend;
                //log("\ntherest",breaks,len/lim,therest,theend);
                fout.writestring(tojson.substring(cout,cout+therest));
            }
        }else{
            //for short lines we can just writeline:
            fout.writeline(tojson);
        }
   fout.close();
        log("\nLivid Preset data write:",filepath);
    }else{
        log("\ncould not create Livid json file:",filepath);
    }
}

function readdump(p) {
    var memstr = "";
    var data = "";
    var maxchars = 800;
    var filepath = "DefaultPreset.json";
    if(p) filepath = p;
    var f = new File(filepath,"read");
    f.open();
    if (f.isopen) {
        log("\nSysex data read:",filepath);
        while(f.position<f.eof) {
            memstr+=f.readstring(maxchars);
        }
        f.close();
    } else {
        log("\nError reading Livid Preset file:",filepath);
    }
    //assign it to the sx object
    sx = JSON.parse(memstr);
	sysexout();
	toobj();
}

//writes json to a file on the server
function writejson(){
  clog("Write JSON to server");
  $.post("sysexjson.php", {json : JSON.stringify(sx,null,'\t')});
}

//-----------MAX SPECIFIC functions: these need translation for browser----------
function alert_panel(s,stay){
	alertbox(s,stay); //in index.html
}

function sendmidi(){
	var arg = flatten( Array.prototype.slice.call(arguments, 0) );
	midi_o(arg);
	//jquery:
	//$.post("../index.html", "json_in midi " +  JSON.stringify(arg) );
}

//populate UI inspectors with values from livid object
var prev_type="";
var ledsvisible=false;
function updatectlinspector(type,id){
	//show the correct div:
	clog(">updatectlinspector() type- "+type+" id- "+id+" (pvs type: "+prev_type+")");
	//var ctltypes = ["btn","led","ledring","enc","fsr","pot", "slide"]
	//fade inspectors in/out when type changes
	var noleds = ( OHM64 && (id>=75 && id<=80) ) || ( BLOCK && (id>=64 && id<=70) || ( DS1 && (id>=25 && id<=28) ) ); //some buttons on these devices have no leds to control
	if(type!=prev_type){
		var fadedur=250;
		ledsvisible=false;
		//$(".ctlinspector").css({visibility: "hidden"}); //conveniently gave the control inspectors their own class
		$(".ctlinspector").fadeOut(fadedur); //conveniently gave the control inspectors their own class
		$("#"+type+"_div").fadeIn(fadedur);
		if(type=="btn"){ //also show the LED inspector for buttons
			ledsvisible=true;
			$("#led_div").fadeIn(fadedur);
		}
	}
	//for buttons with no leds, we need to hide the LED inspector. we'll get the values for these leds later:
	if(type=="btn" || type=="fsr"){
		if(noleds && ledsvisible){
			$("#led_div").fadeOut(fadedur);
		}else{
			$("#led_div").fadeIn(fadedur);
		}
	}
	
	//loop through all the elements in an inspector form. Form "id" in html is same as ctltype (btn, led, ledring, etc)
	$('#'+type+' :input').each(function(v){
		var thesetting;
		var ynhash = [false,true];
		var modehash = ["note","cc"];
		var algmodehash = ["cc.","bend","aftertouch"];
		//var filterhash = ["Low","Medium","High"];
		var filterhash = ['Low', 'Mid', 'Medium','High', 'Highest'];
		var outmodehash = ["abs+fine","precision","fine","inc/dec"];
		var ledstylehash = ["walk","fill","eq","spread"];
		var typehash = ["absolute","relative"];
		//var colorhash = ["invert","red","green","blue","cyan","magenta","white"];
		var ele_type = $(this).attr('type');
		var ele_name = this.name;
		if(ele_name!="ctlid"){
      //clog(">>"+ele_type+" name: "+ele_name+ " - "+ type+ " "+id+ " "+ele_name);
			thesetting = livid[type][id][ele_name]; //value at name of html element, such as "nn"=5 or "mode"=1
		}
		//we may have an instance where we have symbols where we might want numbers in the web interface or vice versa.
		if(ele_type == "checkbox"){
			if(typeof thesetting!="boolean"){
				thesetting=ynhash[thesetting];
			}
		}
		if(ele_type == "text"){
			thesetting=parseInt(thesetting); //make sure it is an int
			if(isNaN(thesetting)){
				thesetting=0;
			}
		}
		if(ele_type == "select-one" || ele_type == "menu"){
      //clog("menu setting "+ele_type+" "+id+" "+ele_name+" "+thesetting);
			if(this.name=="special"){ //for btns special - look at the settings and populate the menu as needed.
				var note=livid[type][id]["nn"];
				var mode=livid[type][id]["mode"];
				var enc=livid[type][id]["isencspeed"];
				var bank=livid[type][id]["isbank"];
				if(note==126 && (mode==1 || mode=='cc')){
					thesetting='bank';
				}else
				if(note==127 && (mode==1 || mode=='cc')){
					thesetting='enc. speed';
				}else
				if(note==122 && (mode==1 || mode=='cc')){
					thesetting='mmc-start';
				}else
				if(note==123 && (mode==1 || mode=='cc')){
					thesetting='mmc-cont.';
				}else
				if(note==124 && (mode==1 || mode=='cc')){
					thesetting='mmc-stop';
				}
				if(note==125 && (mode==1 || mode=='cc')){
					thesetting='indiv. bank';
				}
				else{
					thesetting='---';
				}
			}else{ //all other menus need the integer converted to the appropriate symbol
				if(typeof thesetting=="number"){
					switch(this.name){
						case "mode":
						if(type=="btn" || type=="enc"){
							thesetting=modehash[thesetting];
							//CNTRL:R encoder modes are different than codes - no 'note' setting:
							if(CNTRLR &&  type=="enc"){
							  thesetting="cc";
							}
						}else{
							thesetting=algmodehash[thesetting];
						}
						break;
						case "type":
						thesetting=typehash[thesetting];
						break;
						case "filter":
						thesetting=filterhash[thesetting];
						break;
						case "output":
						thesetting=outmodehash[thesetting];
						break;
						case "style":
						thesetting=ledstylehash[thesetting];
						break;
						case "color":
						thesetting=colorhash[thesetting];
						break;
					}
				}
			}
		}
		//now we populate the form elements with the value:
		if(ele_type!="submit" && ele_type!="hidden"){
			if(ele_type == "checkbox"){
				var ischeck = thesetting; //boolean
				//clog("CHECKBOX type "+type+" name "+ele_name+" setting "+thesetting);
				$(this).prop("checked",ischeck);
			}else{
				//clog("POPULATE: type "+type+" name "+ele_name+" setting "+thesetting);
				$(this).val(thesetting);
			}
		}
		if(ele_type == "hidden"){
			$(this).val(id);
			//log(v+" "+ele_type+" populate "+this.name+" with "+id);
		}
	});
	
	prev_type=type;/*
	//accomodate a bit of an exception!
	if(type=="led"){
		prev_type="btn";
	}*/
	//for buttons, also get the LED values and update the interface:
	if((type == "btn" || type == "fsr") && !noleds){
		type = "led";
		//loop through the elements in the LED inspector:
		$('#'+type+' :input').each(function(v){
			thesetting = "";
			ynhash = [false,true];
			modehash = ["note","cc"];
			ele_name = this.name;
			if(ele_name!="ctlid"){
				thesetting = livid[type][id][ele_name]; //name of html element, such as "nn"or "mode"
				//clog("raw setting "+type+" "+id+" "+ele_name+" "+thesetting);
			}
			
			if(this.type == "select-one" || this.type == "menu"){
				if(typeof thesetting=="number"){
					switch(this.name){
						case "mode":
						thesetting=modehash[thesetting];
						break;
						case "type":
						thesetting=typehash[thesetting];
						break;
					}
				}
			}
			//we may have an instance where we have symbols where we might want numbers in the web interface or vice versa.
			if(this.type == "checkbox"){
				if(typeof thesetting!="boolean"){
					thesetting=ynhash[thesetting];
				}
			}
			if(this.type == "text"){
				thesetting=parseInt(thesetting); //make sure it is an int
				if(isNaN(thesetting)){
					thesetting=0;
				}
			}
			if(this.type!="submit"){
				if(this.type == "checkbox"){
					var ischeck = thesetting; //boolean
					$(this).prop("checked",thesetting);
					//clog("--"+this.type+" : populate "+this.name+" with "+thesetting+" type "+typeof thesetting);
				}else{
					$(this).val(thesetting);
					//clog("--"+this.type+" : populate "+this.name+" with "+thesetting);
				}
			}
			if(this.type == "hidden"){
				$(this).val(id);
				//log("(hidden) "+this.name+" with "+id);
			}
		});
		
	}
	//give the inspector an ID label
	$(".ctlid").text("[ID: "+id+"]");
}

//update the ui for the globals panel
function updateglobalinspector(ctlui,val){
	var speedhash = ["1x","2x","3x","4x","5x","6x","7x","8x","9x","10x","11x","12x","13x","14x","15x","1/2x","1/3x","1/4x","1/5x","1/6x","1/7x","1/8x","1/9x","1/10x","1/11x","1/12x","1/13x","1/14x","1/15x"];
	var thesetting=val;
	var formele = $('#'+ctlui);
	clog("GLOBALS ui: "+formele.attr('type')+" -- "+ctlui+" v "+val )
	switch(formele.attr('type')){
		case "text":
		thesetting=parseInt(thesetting); //make sure it is an int
		if(isNaN(thesetting)){
			thesetting=0;
		}
		formele.val(thesetting);
		break;
		case "menu":
		if(typeof thesetting=="number" && (ctlui=="encspeedA" || ctlui=="encspeedB") ){
			thesetting=speedhash[thesetting];
		}
		formele.val(thesetting);
		break;
		case "checkbox":
		var ischeck = thesetting>0; //make it bool
		clog("Global Form "+ctlui+" setting "+ischeck+ " setting "+thesetting);
		formele.prop("checked",ischeck);
		break;
	}
}

var saveclicked = 0; //set to 1 when the save to device button is clicked in faceplate.js
function notify(note){
	if(note=="ACK"){
		if(saveclicked){
			alert_panel("Settings saved to device");
			saveclicked = 0;
		}
	}
	if(note=="done"){
		clog("done");
	}
}

function printsx(){
	for(i in sx){
		clog("sx"+' '+i+' '+":"+' '+sx[i]+' '+"-len-"+' '+sx[i].length+" last "+sx[i][(sx[i].length-1)]);
	}
}
function printenc(){
	for(i in livid.enc){
		clog("enc"+' '+i+' '+":"+' '+livid.enc[i].nn);
	}
}

//---------------------------------------------UTILITES---------------------------------------------------
//flatten mixed objects into a single array. for example, if I call a function sysexout(head,23,eom), the head is an array, which gets wrapped into the arguments object/array. 
function flatten(){
	var tmp = [];
	var a = Array.prototype.slice.call(arguments, 0);
	for(var i=0;i<a.length;i++){
		if(typeof a[i]=="object"){
			for(var j=0;j<a[i].length;j++){

				if(typeof a[i][j]=="object"){
					for(var k=0;k<a[i][j].length;k++){

						tmp.push(a[i][j][k]);

					}

				}else{
					tmp.push(a[i][j])

				}
			}
		}else{
			tmp.push(a[i])
		}
	}
	return tmp;
}

function allnotesoff(){
	var ch = (livid.globl.settingsch)-1;
	sendmidi(176+ch,123,0);
}

function printtype(v){
	for(var type in livid){
		if(type!="globl" && type==v){
			for(var i in livid[type]){
				//post("\n--",i);
				for(var p in livid[type][i]){
					clog(">"+" "+type+" "+i+" "+p+" "+livid[type][i][p]);
				}
			}
		}else if(v=="globl"){
			for(var p in livid[type]){
				clog(">"+" "+type+" "+i+" "+p+" "+livid[type][p]);
			}
		}
		
	}
}

function printlivid(){
	for(var type in livid){
		clog("-"+" "+type);
		if(type=="globl"){
			for(var i in livid[type]){
				clog("--"+" "+i);
				if(type=="globl") clog(">"+" "+type+" "+i+" "+livid[type][i]);
				for(var p in livid[type][i]){
				//	if(type=="toggle") //restrict to a type here!
						clog(">"+" "+type+" "+i+" "+p+" "+livid[type][i][p]);
				}
			}
		}else{
			for(var p in livid[type]){
				//log(">"+" "+type+" "+i+" "+p+" "+livid[type][p]);
			}
		}
		
	}
}

function globlquest(){
	for(var p in livid.globl){		
		var tmp=Number(livid.globl[p]);
		clog("glob"+" "+p+" "+livid.globl[p]+" "+tmp+" "+"type"+" "+typeof livid.globl[p]+" "+typeof tmp);
	}
}

//find bit value at bit position 
function flagger(v,i){
	var torf=parseInt(v&(1<<i))>0;
	return Number(torf);
}

//decimal to binary
function dtob(v,fill){
	var binlist=[];
	var binlist_=[];
	var bin = v.toString(2);
	if(fill){
		binlist=zeroFill(bin,fill);
	}
	for(var i in bin){
		binlist[i]=parseInt(bin[i]);
	}
	for(var i=0; i<binlist.length; i++) { binlist_[i] = parseInt(binlist[i], 10); } 
	//post("\ndotob",typeof binlist_,binlist_);
	return binlist_;
}

//binary to dec
function btod(){
	var a=Array.prototype.slice.call(arguments, 0);
	var dec;
	if(a[0].length>1){
		dec = parseInt(a[0].join(""),2);
	}else{
		dec = parseInt(a.join(""),2);
	}
	return dec;
}

function zeroFill( number, width )
{
    width -= number.toString().length;
    if ( width > 0 )
    {
    	return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number;
}

//makes MIDItoID key/value map so we can highlight controls as their MIDI coms in
function dumpmap(){
	for(var type in livid){
		if(type!="globl" && type!="ledring" && type!="led" && type!="encvalues"){
			for(var i in livid[type]){
				var sbs; //status bytes
				if(type=="btn"|| type=="fsr") sbs=[144,176];
				else sbs=[176,176]; //enc and pot are always ccs
				var nn=parseInt(livid[type][i].nn);//parseInt may not be needed, but if it is, well, problem solved!
				var mode=parseInt(livid[type][i].mode);
				var ch=parseInt(livid.globl.bankch)-1;
				var status = sbs[mode]+ch;
				var key = status | (nn << 8); //decode: status = key & 255; nn = (key >> 8) & 255;\				
				miditoID[key]=[i,type];
				//log("miditoID: key "+key+" nn "+nn+" mode "+mode+" status "+status+" , "+i+" "+type);
			} 
		}
	}
	//outlet(3,"mapdone");
}
 
//error supressions:
function start(){
	clog("START");
}

var remote_type="";
var remote_id=0;
function enc(v){
	remote_type = messagename;
	remote_id = v;
}
function btn(v){
	remote_type = messagename;
	remote_id = v;
}
function ledring(v){
	remote_type = messagename;
	remote_id = v;
}
function led(v){
	remote_type = messagename;
	remote_id = v;
}
function mode(v){
	if(v=="on"){
		getid(remote_type+"_"+remote_id);
	}
}
function bang(){
	clog("uitocontroller.js: bang");
}