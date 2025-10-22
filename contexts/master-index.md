# Thunder Mountain Campaign - Master Index
**Campaign Type**: D&D 5e 2024 | **Status**: Session 6 in progress | **GM**: Robert

## Quick Start

**Planning next session?** Start here:
1. [Campaign State](./campaign-state.md) 📍 - Current status, active threats, prep checklist
2. [Active NPCs](./active-npcs.md) 📍 - Who might appear soon
3. [Session Prep Template](./session-prep-template.md) 📍 - Your workflow

**Looking for specific info?** Use sections below.

## Core Context Files

### contexts/ Directory (You Are Here)
| File | Purpose | Update Frequency |
|------|---------|------------------|
| [campaign-state.md](./campaign-state.md) | Current campaign status | After each session |
| [active-npcs.md](./active-npcs.md) | NPCs likely to appear soon | After each session |
| [session-prep-template.md](./session-prep-template.md) | Prep workflow guide | As needed |
| [player-knowledge.yaml](./player-knowledge.yaml) | What PCs know | After each session |
| [campaign-data.yaml](./campaign-data.yaml) | Historical metadata | Rarely |
| [dm_session_summary.md](./dm_session_summary.md) | Initial planning notes | Historical |

## Documentation by Type

### Session Planning & Notes
```
notes/
├── session-4/          # Past session materials
├── session-5/          # Past session materials
├── session-6/          # CURRENT session prep
│   ├── 00-INDEX.md         # Control panel (start here!)
│   ├── opening-scene.md
│   ├── hooks/              # Plot threads available
│   └── quick-refs/         # Stat blocks, mechanics
└── WORK-STATUS.md      # Project tracker
```

**Pattern**: Each session has 00-INDEX.md as entry point

### Lore & World Building
```
lore/
├── index.md                    # Lore navigation hub
├── master-timeline.md          # Chronological events
├── subplot-tracker.md          # Active story threads
├── campaign-frame.md           # Jack's lecture structure
│
├── characters/
│   ├── pc/                     # Player characters
│   │   └── maza.md             # "How to Be" format
│   └── npc/
│       ├── cragmaw/            # By location
│       ├── facility/
│       ├── leilon/
│       └── phandalin/
│
├── locations/
│   ├── cragmaw/
│   ├── leilon/
│   ├── phandalin/
│   └── thunder-mountain/       # The facility
│
├── timers/
│   ├── doom-clocks.md          # Active threats
│   └── enroute/                # Incoming events
│
└── archive/                    # Past session records
```

### Lectures (Framing Device)
```
lectures/
├── 01-Intro.md                 # Session 1 opening
├── 02-Off-we-go.md             # Session 2 opening
└── 03-Welcome-to-the-machine.md # Session 3 opening
```

**Format**: Professor Jack (1495 DR) narrating "The Phandalin Incident" (1492 DR)

### Reference Documentation
```
docs/
├── README.md                   # Project overview
├── planning.md                 # Campaign design philosophy
├── documentation-standards.md  # File format conventions
├── session-0-plan.md           # Character creation session
└── session-2-prep.md           # Example prep materials
```

### Transcripts
```
transcripts/
├── ses-01.txt                  # ~1400 lines
├── ses-02.txt                  # ~1800 lines
├── ses-04.txt                  # Missing/empty
├── ses-05.txt                  # ~3 lines (short session?)
└── ses-06.txt                  # Empty (upcoming)
```

**Note**: Session 3 recording missing, covered in notes

### Utilities
```
scripts/
├── check-links.js              # Link validation
└── check-links-v2.js           # Updated validator
```

## Navigation by Task

### "I'm planning next session"
1. [Campaign State](./campaign-state.md) - Where are we?
2. notes/session-N/00-INDEX.md - Control panel
3. [Active NPCs](./active-npcs.md) - Who appears?
4. [Doom Clocks](../lore/timers/doom-clocks.md) - Advancing threats
5. [Session Prep Template](./session-prep-template.md) - Workflow

### "I need NPC information"
1. [Active NPCs](./active-npcs.md) - Quick reference
2. lore/characters/npc/{location}/ - Full details
3. Search for "How to Be" format for player-facing

### "What happened last session?"
1. [Campaign State](./campaign-state.md) - Summary
2. [Master Timeline](../lore/master-timeline.md) - In-game chronology
3. transcripts/ses-N.txt - Full recording
4. notes/session-N/ - Prep materials used

### "I need to create new lore"
1. Check [Lore Index](../lore/index.md) - Existing structure
2. Follow location/NPC directory patterns
3. Use 📍 for cross-references
4. Update relevant index files

### "Player asked about their character's knowledge"
1. [Player Knowledge](./player-knowledge.yaml) - What PCs know
2. Character backstories in lore/characters/pc/
3. [Master Timeline](../lore/master-timeline.md) - Events witnessed

### "I need encounter stats"
1. notes/session-N/quick-refs/stat-blocks.md - DDB links
2. Search lore for creature details
3. notes/session-N/encounter-*.md - Specific encounters

## File Format Conventions

### Markdown Headers
```markdown
# Title - Subtitle
**Key Info**: Value | **Other Info**: Value

## Sections
Content with [cross-references](./path.md) 📍
```

### Cross-Reference System
- `📍` indicates internal project link
- `🕮` indicates D&D Beyond external link
- `[C/R]` indicates "canon with reservations" (homebrewed)

### Card Format (NPCs)
```markdown
# How to Be [Character Name]
**Player**: Name | **Class**: Details | **Background**: Type

## What [Character] Knows
Table format for quick reference

## Motivations
Numbered list

## Opening Lines
Choose-one format for improv

## Personality Notes
Bullet points
```

### Control Panel Format
```markdown
# Session N Control Panel - Title
**Date**: [TBD] | **Level**: N | **Party**: Names

## Quick Reference
Table linking all session materials

## Session Flow
Numbered beats

## Key Decisions
Checkbox list
```

## Campaign Metadata

### Players
- **Thunder** (Robert's niece): Smol Bean, High Elf Sorcerer, new to D&D
- **Kyle** (Thunder's boyfriend): Songbird, Human Bard, experienced
- **Martha** (new): Maza Fieldsalder, Paladin, joining Session 5+
- **Sarah** (friend): Seraphina (departed), may return later

### Timeline
- **Planning**: June 2025
- **Session 0**: Completed early
- **Sessions 1-6**: Spring 1492 DR (in-game), Sessions over ~6 weeks real-time
- **Lectures**: 1495 DR (Professor Jack's framing)

### Campaign Theme
"Little Game, Big World" - Intimate 6-session story against immense scrollable world

### Style
- Light, comedic, Pythonesque
- Subverted species stereotypes (sophisticated goblins)
- Story-heavy with crunchy combat support
- Player agency prioritized over railroad

## GM Support System

### Robert's Tools
- Claude collaboration for worldgen and planning
- Quality equipment for confidence (Wyrmwood, dice, BOOX)
- Foundry VTT + D&D Beyond
- Physical materials (battle maps, minis)

### Collaboration Pattern
- Robert: Architecture, design, performance
- Claude: Implementation, world building, preparation
- Focus: Combined expertise, assumption validation

### Philosophy
- No homework policy for players
- "Yes, and..." over railroading
- Turn mistakes into worldbuilding
- Quality > quantity in preparation

## Version Control

**Repository**: github.com/rdeforest/ThunderMountain
**Branch**: main
**Commit Style**: Descriptive, not emoji-laden

## Update Priorities

After each session:
1. campaign-state.md (current status)
2. active-npcs.md (relationship changes)
3. player-knowledge.yaml (new information)
4. doom-clocks.md (timer advancement)
5. Create notes/session-N+1/ for next session

## Questions or Additions?

This index is a living document. Update as project structure evolves.

**Last Updated**: Session 6 prep
