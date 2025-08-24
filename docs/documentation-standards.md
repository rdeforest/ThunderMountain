# Thunder Mountain Documentation Standards

## Directory Structure
```
ThunderMountain/
├── docs/           # Meta documentation (like this file)
├── lore/           # Persistent world information
│   ├── characters/
│   │   ├── pc/     # Player characters
│   │   └── npc/    # NPCs organized by location
│   ├── locations/  # Places organized by region
│   └── timers/     # Countdown events by status
├── notes/          # Session-specific materials
│   └── session-N/  # Per-session directories
└── transcripts/    # Actual play recordings
```

## Card Format Standards

### Size Limit
- **Maximum 20 lines** for easy single-screen viewing
- Test on both 34" monitor and 16" MacBook Pro

### Structure
1. **Title** with brief descriptor
2. **Key info table** (when >2 items)
3. **Narrative content** (brief, immersive)
4. **Links section** ("Referenced In" at bottom)

### Tables
- Use for scanning when >2 related items
- Keep columns aligned for readability
- Include headers for clarity

### Linking
- Use markdown format: `[text](relative/path.md)`
- Link to DDB for official content
- Always include "Referenced In" section
- Use 📍 icon when linking to existing files

### Timer Format
```markdown
**Status**: Location/state
**Minimum Periods**: N (N×5 days)
**Decrement**: Math.max(0, X - d4()) per session
```

## File Naming
- Lowercase with hyphens: `harbin-wester.md`
- NPCs: `npc/location/name.md`
- Timers: `timers/status/entity-event.md`

## Content Guidelines
- Link character names to their cards
- Link locations to location cards
- Link game terms to DDB when possible
- Include backstory references for immersion
- Keep stat blocks as DDB links or simple tables

## Process
1. Create card in appropriate lore/ or notes/ directory
2. Update relevant index files
3. Add "Referenced In" links
4. Update WORK-STATUS.md tracker