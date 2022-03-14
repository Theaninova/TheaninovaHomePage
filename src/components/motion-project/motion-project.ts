export type SourceFileStatus = 'private' | 'public' | 'damaged' | 'lost'

export type Tool = 'sdf' | '3d' | '2d'

export type OfficialStatus = 'commissioned' | 'official' | 'fan art'

export interface MotionProject {
  author: string
  created: string
  description?: string
  image: string
  sourceFile?: string
  title: string
  sourceFileStatus?: SourceFileStatus
  tool?: Tool[]
  official?: OfficialStatus
}

export interface StatusBulb {
  label: string
  abbr: string
  color: string
}

export const toolBulbs: Record<Tool, StatusBulb> = {
  'sdf': {
    abbr: 'SDF',
    label: 'Signed Distance Function',
    color: '#efefef',
  },
  '3d': {
    label: '3D',
    abbr: '3D',
    color: '#efefef',
  },
  '2d': {
    label: '2D',
    abbr: '2D',
    color: '#efefef',
  },
}

export const officialBulbs: Record<OfficialStatus, StatusBulb> = {
  'commissioned': {
    label: 'Commissioned',
    abbr: 'Com',
    color: '#aeffa1',
  },
  'official': {
    abbr: 'OFF',
    label: 'Official',
    color: '#aeffa1',
  },
  'fan art': {
    abbr: 'Fan',
    label: 'Fan Art',
    color: '#efefef',
  },
}

export const sourceFileStatusBulbs: Record<SourceFileStatus, StatusBulb> = {
  private: {
    abbr: 'prv',
    label: 'Private',
    color: '#efefef',
  },
  public: {
    abbr: 'pub',
    label: 'Public',
    color: '#aeffa1',
  },
  damaged: {
    abbr: 'dam',
    label: 'Damaged',
    color: '#ffe5a1',
  },
  lost: {
    abbr: 'ded',
    label: 'Lost',
    color: '#ffa1a1',
  },
}
