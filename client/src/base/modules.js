import React from "react";

/**----- Icons */
import Motor from "base/icons/survey.png";
import Settings from "base/icons/settings.png";
import Messages from "base/icons/messages.png";
import Resume from "base/icons/mail_push.png";

export const modules = [
  {
    name: "Messages",
    links: [],
    main: "messages",
    icon: Messages,
    active: true,
  },
  {
    name: "Motor",
    links: [
      {
        name: "dashboard",
        links: [],
        groupAccess: ["admin", "user", "superAdmin"],
      },
      {
        name: "identifications",
        links: [],
        groupAccess: ["admin", "user", "superAdmin"],
      },
      {
        name: "basiques",
        links: ["provinces", "villes", "communes", "quartiers"],
        groupAccess: ["user", "admin", "superAdmin"],
      },
      {
        name: "cooperatives",
        links: [],
        groupAccess: ["admin", "superAdmin"],
      },
      {
        name: "rapports",
        links: ["identifications", "vehicules"],
        groupAccess: ["admin", "superAdmin"],
      },
      {
        name: "paramètres",
        links: ["utilisateurs", "gillets"],
        groupAccess: ["superAdmin"],
      },
    ],
    icon: Motor,
    main: "dashboard",
    path: "",
    active: true,
  },
  {
    name: "Resume",
    links: [
      {
        name: "cvs",
        links: [],
        groupAccess: ["admin", "user", "superAdmin"],
      },
    ],
    icon: Resume,
    main: "cvs",
    path: "",
    active: true,
  },
  {
    name: "Settings",
    links: [
      { name: "dashboard", links: [], groupAccess: ["admin", "superAdmin"] },
      { name: "applications", links: [], groupAccess: ["superAdmin"] },
      {
        name: "configuration",
        links: ["company"],
        groupAccess: ["superAdmin"],
      },
    ],
    main: "dashboard",
    icon: Settings,
    path: "",
    active: true,
  },
];
