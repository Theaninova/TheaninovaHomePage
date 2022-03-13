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
  color: string
}

export const toolBulbs: Record<Tool, StatusBulb> = {
  'sdf': {
    label: 'SDF',
    color: '#efefef',
  },
  '3d': {
    label: '3D',
    color: '#efefef',
  },
  '2d': {
    label: '2D',
    color: '#efefef',
  },
}

export const officialBulbs: Record<OfficialStatus, StatusBulb> = {
  'commissioned': {
    label: 'Com',
    color: '#aeffa1',
  },
  'official': {
    label: 'OFF',
    color: '#aeffa1',
  },
  'fan art': {
    label: 'Fan',
    color: '#efefef',
  },
}

export const sourceFileStatusBulbs: Record<SourceFileStatus, StatusBulb> = {
  private: {
    label: 'prv',
    color: '#efefef',
  },
  public: {
    label: 'pub',
    color: '#aeffa1',
  },
  damaged: {
    label: 'dam',
    color: '#ffe5a1',
  },
  lost: {
    label: 'ded',
    color: '#ffa1a1',
  },
}
