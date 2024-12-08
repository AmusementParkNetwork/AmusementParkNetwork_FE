export const rankingData = {
  amusement: [
    {
      name: "바이킹",
      waiting: {
        number: 36, // 대기 인원 수
        waitTime: 36 * 5, // 대기 시간 (분)
        guage: (36 * 5) / 30, // 30분에 1개씩
      },
      crowded: {
        degree: 10, // 혼잡 인원
        percentage: 10 * 10, // 혼잡도 (%)
        guage: 10 / 2, // 2인에 1개씩
      },
    },
    {
      name: "사파리",
      waiting: {
        number: 22,
        waitTime: 110,
        guage: 110 / 30,
      },
      crowded: {
        degree: 6,
        percentage: 60,
        guage: 6 / 2,
      },
    },
    {
      name: "판다월드",
      waiting: {
        number: 20,
        waitTime: 100,
        guage: 100 / 30,
      },
      crowded: {
        degree: 3,
        percentage: 30,
        guage: 3 / 2,
      },
    },
    {
      name: "로스트밸리",
      waiting: {
        number: 14,
        waitTime: 70,
        guage: 70 / 30,
      },
      crowded: {
        degree: 3,
        percentage: 30,
        guage: 3 / 2,
      },
    },
    {
      name: "허리케인",
      waiting: {
        number: 12,
        waitTime: 60,
        guage: 60 / 30,
      },
      crowded: {
        degree: 2,
        percentage: 20,
        guage: 2 / 2,
      },
    },
    {
      name: "롤링익스트레인",
      waiting: {
        number: 12,
        waitTime: 60,
        guage: 60 / 30,
      },
      crowded: {
        degree: 2,
        percentage: 20,
        guage: 2 / 2,
      },
    },
    {
      name: "더블락스핀",
      waiting: {
        number: 8,
        waitTime: 40,
        guage: 40 / 30,
      },
      crowded: {
        degree: 2,
        percentage: 20,
        guage: 2 / 2,
      },
    },
    {
      name: "회전목마",
      waiting: {
        number: 6,
        waitTime: 30,
        guage: 30 / 30,
      },
      crowded: {
        degree: 0,
        percentage: 0,
        guage: 0 / 2,
      },
    },
  ],
  amenity: [
    {
      name: "푸드코트",
      waiting: {
        number: 0,
        waitTime: 0,
        guage: 0,
      },
      crowded: {
        degree: 5,
        percentage: 50,
        guage: 3 / 2,
      },
    },
    {
      name: "기념품샵",
      waiting: {
        number: 0,
        waitTime: 0,
        guage: 0,
      },
      crowded: {
        degree: 3,
        percentage: 30,
        guage: 2 / 2,
      },
    },
  ],
  photo: [
    {
      name: "장미원",
      waiting: {
        number: 0,
        waitTime: 0,
        guage: 0,
      },
      crowded: {
        degree: 10,
        percentage: 100,
        guage: 6,
      },
    },
    {
      name: "이솝우산길",
      waiting: {
        number: 0,
        waitTime: 0,
        guage: 0,
      },
      crowded: {
        degree: 0,
        percentage: 0,
        guage: 1,
      },
    },
  ],
};

export const chatData = [
  {
    isAdmin: true,
    sender: "관리자",
    text: "장미원 혼잡도 100 관리 인력 충원 요청합니다.",
  },
  {
    isAdmin: false,
    sender: "썬더풀스 | 김눈송",
    text: "썬더풀스 캐스트 김눈송 1명 인력 보충하겠습니다.",
  },
  {
    isAdmin: true,
    sender: "관리자",
    text: "장미원 혼잡도 100 관리 인력 충원 요청합니다.",
  },
  {
    isAdmin: false,
    sender: "썬더풀스 | 김눈송",
    text: "썬더풀스 캐스트 김눈송 1명 인력 보충하겠습니다.",
  },
  {
    isAdmin: true,
    sender: "관리자",
    text: "장미원 혼잡도 100 관리 인력 충원 요청합니다.",
  },
  {
    isAdmin: false,
    sender: "썬더풀스 | 김눈송",
    text: "썬더풀스 캐스트 김눈송 1명 인력 보충하겠습니다.",
  },
];

export const noticeData = [
  {
    title: "[긴급 안내] 폭설로 인한 일부 놀이기구 운영 중단",
    description:
      "오늘 오전 폭설로 인해 일부 야외 놀이기구의 운영이 일시 중단됩니다.",
    date: "2024.12.09",
  },
  {
    title: "[안전 공지] 기상 악화 시 실내 시설 이용 권장",
    description:
      "강풍 예보로 인해 실외 시설 이용이 제한될 수 있으니 실내 시설을 이용해주세요.",
    date: "2024.12.09",
  },
  {
    title: "[특별 공지] 공원 내 마스크 착용 의무 해제",
    description:
      "정부 지침에 따라 야외 마스크 착용 의무가 해제되었음을 알려드립니다.",
    date: "2024.12.09",
  },
  {
    title: "[할인 정보] 연간 이용권 겨울 프로모션",
    description:
      "한정 기간 동안 연간 이용권을 최대 30% 할인된 가격에 구매할 수 있습니다.",
    date: "2024.12.09",
  },
  {
    title: "[행사 공지] 크리스마스 특별 공연 안내",
    description:
      "12월 한 달 동안 진행되는 크리스마스 특별 공연으로, 장미공원 혼잡도가 높을 것으로 예상됩니다.",
    date: "2024.12.05",
  },
  {
    title: "[운영 시간 변경] 주말 연장 운영 안내",
    description:
      "12월부터 토요일과 일요일에는 공원 운영 시간이 밤 10시까지 연장됩니다.",
    date: "2024.12.01",
  },
  {
    title: "[이벤트] 겨울 시즌 '매직 스노우 페스티벌' 개최",
    description:
      "겨울 분위기를 만끽할 수 있는 특별 퍼레이드와 공연이 시작될 예정이니 원활한 행사 관리 부탁드립니다.",
    date: "2024.12.01",
  },
];
