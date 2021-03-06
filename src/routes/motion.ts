import type {MotionProject} from '../lib/motion-project/motionProject'

export async function get() {
  return {
    body: {
      projects: motionProjects,
    }
  }
}

const proj: MotionProject[] = [
  {
    title: 'Theaninova',
    image: 'theaninova_x256.webm',
    sourceFile: 'https://drive.google.com/file/d/1DFt17j8SmHM5Drz8QRVnxSgu4vTNhLCd/view',
    author: 'Theaninova',
    created: '2021-11-02',
    sourceFileStatus: 'public',
    tool: ['sdf'],
  },
  {
    title: 'Blockshot V2',
    image: 'blockshot_v2_x256.webm',
    author: 'Theaninova',
    created: '2020-12-12',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'commissioned',
  },
  {
    title: 'Blockshot V1',
    image: 'blockshot_v1_x256.webm',
    author: 'Theaninova',
    created: '2019-09-16',
    sourceFileStatus: 'public',
    tool: ['2d'],
    official: 'fan art',
  },
  /*{
    title: 'SN1054',
    image: 'sn1054.gif',
    author: 'Theaninova',
    created: '2021-06-02',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'commissioned',
  },*/
  {
    title: 'Hytech',
    image: 'hytech_x256.webm',
    author: 'Theaninova',
    created: '2020-02-06',
    sourceFileStatus: 'public',
    tool: ['2d'],
  },
  {
    title: 'AKA-ART',
    image: 'aka_art_x256.webm',
    author: 'Theaninova',
    created: '2021-09-07',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'fan art',
  },
  {
    title: 'Clixoom',
    image: 'clixoom_x256.webm',
    author: 'Theaninova',
    created: '2020-09-06',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'official',
  },
  {
    title: '5MANS',
    image: '5mans_x256.webm',
    author: 'Theaninova',
    created: '2020-10-08',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'official',
  },
  /*{
    title: 'Aiming.pro V1',
    image: 'aimingpro_v1.gif',
    author: 'Theaninova',
    created: '2020-12-01',
    sourceFileStatus: 'damaged',
    tool: ['sdf'],
    official: 'official',
  },*/
  {
    title: 'Gamecation',
    image: 'gamecation_x256.webm',
    author: 'Theaninova',
    created: '2022-03-01',
    sourceFileStatus: 'public',
    tool: ['sdf', '3d'],
    official: 'commissioned',
  },
  {
    title: 'Amir and Malene',
    image: 'amir_and_malene_x256.webm',
    author: 'Theaninova',
    created: '2021-12-19',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'commissioned',
  },
  {
    title: 'Asakesto V2',
    image: 'asakesto_v2_x256.webm',
    author: 'Theaninova',
    created: '2020-09-04',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'commissioned',
  },
  {
    title: 'Asakesto V1',
    image: 'asakesto_v1_x256.webm',
    author: 'Theaninova',
    created: '2020-08-11',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'commissioned',
  },
  {
    title: 'Nephthys Union',
    image: 'nephthys_union_x256.webm',
    author: 'Theaninova',
    created: '2021-02-07',
    sourceFileStatus: 'public',
    tool: ['sdf'],
  },
  {
    title: 'Aiming.pro V3',
    image: 'aiming_pro_v3_x256.webm',
    author: 'Theaninova',
    created: '2021-06-30',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'official',
  },
  {
    title: 'Kiarotu V2',
    image: 'kiarotu_v2_x256.webm',
    author: 'Theaninova',
    created: '2021-02-06',
    sourceFileStatus: 'public',
    tool: ['sdf'],
  },
  /*{
    title: 'Lunar',
    image: 'lunar.gif',
    author: 'Theaninova',
    created: '2021-11-03',
    sourceFileStatus: 'public',
    tool: ['sdf'],
  },*/
  {
    title: 'R3DOUT V2',
    image: 'r3dout_v2_x256.webm',
    author: 'Theaninova',
    created: '2021-02-06',
    sourceFileStatus: 'public',
    tool: ['sdf'],
    official: 'official',
  },
]

export const motionProjects = proj.sort((a, b) => {
  if (a.created > b.created) {
    return -1
  }
  if (a.created < b.created) {
    return 1
  }
  return 0
})
