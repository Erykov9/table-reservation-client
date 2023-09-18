import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export const navigationValues = [
  {
    id: 1,
    value: "Współpraca",
    href: "partnership"
  },
  {
    id: 2,
    value: "Rezerwacja",
    href: "reservation"
  },
  {
    id: 3,
    value: "Kontakt",
    href: "contact"
  }
];

export const menuValues = [
  {
    id: 1,
    value: "Twoje konto",
    href: "/profile"
  },
  {
    id: 2,
    value: "Zarządzaj salą",
    href: "management"
  },
  {
    id: 3,
    value: "Rezerwacje",
    href: "reservations"
  },
  {
    id: 4,
    value: "Statystyki",
    href: "statistics"
  }
];

export const navigationPanelValues = [
  {
    id: 1,
    value: <FontAwesomeIcon icon={faLock} />,
    href: "login"
  },
  {
    id: 2,
    value: <FontAwesomeIcon icon={faUserPlus} />,
    href: "register"
  }
];

export const sponsorsValues = [
  {
    id: 1,
    value: "easy",
    src: "latwo.png"
  },
  {
    id: 2,
    value: "fast",
    src: "szybko.png"
  },
  {
    id: 3,
    value: "sure",
    src: "pewnie.png"
  },
]