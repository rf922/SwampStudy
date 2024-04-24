const users = {
  kimberly: {
    id: 9,
    first_name: "Kimberly",
    last_name: "Balantac",
    email: "kimb@sfsu.edu",
    profile_picture: "/images/profile/kim.png",
    weekavailability: 18,
    educator: false,
    introvert: true,
    isHidden: false,
    biography:
      "Hi all im a third year psychology major, I live in the bay area and want to connect with more people around campus to study and hang out with !",
    courses: [
      {
        id: 1,
        name: "Personnel Psychology ",
        number: 462,
        department: "PSY",
      },
      {
        id: 12,
        name: "The Psychology of Work-Life Stress",
        number: 465,
        department: "PSY",
      },
      {
        id: 21,
        name: "Introduction to Philosophy",
        number: 300,
        department: "Phil",
      },
    ],
  },

  helen: {
    id: 10,
    first_name: "Helen",
    last_name: "Pabalate",
    email: "hpabalate@sfsu.edu",
    profile_picture: "/images/profile/helen.png",
    weekavailability: 18,
    educator: false,
    introvert: true,
    isHidden: false,
    biography:
      "Hey, im a first year business major and would really like someone to study in the library with. Mostly I want someone who I can read and share ideas with.",
    courses: [
      {
        id: 1,
        name: "Foundations in Business Communications ",
        number: 216,
        department: "BUS",
      },
      {
        id: 12,
        name: "Critical Thinking and the Asian American Experience",
        number: 110,
        department: "AAS",
      },
      {
        id: 2111,
        name: "Introduction to Oral and Public History: The Bay Area",
        number: 303,
        department: "HIST",
      },
      {
        id: 21,
        name: "Asian Americans and Mass Media",
        number: 212,
        department: "AAS",
      },
    ],
  },

  christina: {
    id: 11,
    first_name: "Christina",
    last_name: "Truong",
    email: "ctruong@sfsu.edu",
    profile_picture: "/images/profile/christina.png",
    weekavailability: 1,
    educator: false,
    introvert: true,
    isHidden: false,
    biography:
      "Hi all im a graduate student in mathematics ! Im lucking for other math majors to hang and study with also im open to helping out / tutoring :) ! ",
    courses: [
      {
        id: 1,
        name: "Algebraic Topology",
        number: 852,
        department: "Math",
      },
      {
        id: 12,
        name: "Advanced Linear Algebra",
        number: 110,
        department: "Math",
      },
    ],
  },

  beverly: {
    id: 101,
    first_name: "Beverly",
    last_name: "Aragones",
    email: "bevaragones@sfsu.edu",
    profile_picture: "/images/profile/beverly.png",
    weekavailability: 24,
    educator: false,
    introvert: true,
    isHidden: false,
    biography: "Hi all im a first year Art History major !",
    courses: [
      {
        id: 1,
        name: "Western Art History I",
        number: 201,
        department: "ARTH",
      },
      {
        id: 12,
        name: "Global Art History I ",
        number: 110,
        department: "ARTH",
      },
      {
        id: 21,
        name: "Introduction to Philosophy",
        number: 300,
        department: "Phil",
      },
      {
        id: 2121,
        name: "History of California ",
        number: 450,
        department: "HIST",
      },
    ],
  },
  klara: {
    id: 210,
    first_name: "Klara",
    last_name: "Magallanes",
    email: "kmagallanes@sfsu.edu",
    profile_picture: "/images/profile/klara.png",
    weekavailability: 12,
    educator: false,
    introvert: true,
    isHidden: false,
    biography: "Hi all im a first year Physics major !",
    courses: [
      {
        id: 1,
        name: "Conceptual Physics ",
        number: 101,
        department: "PHYS",
      },
      {
        id: 12,
        name: " Conceptual Physics Laboratory",
        number: 102,
        department: "PHYS",
      },
      {
        id: 21,
        name: "Our Dynamic Earth",
        number: 110,
        department: "ERTH",
      },
      {
        id: 2221,
        name: "California Water ",
        number: 330,
        department: "ERTH",
      },
    ],
  },
};

export default users;

/**
 * '68', 'kimberley', 'Balantac', 'https://swampstudy.s3.us-west-1.amazonaws.com/profiles/kim_1713924523310.png++++++++++', '68', '0', '0', '', '0', '0'

 */
