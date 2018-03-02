let classRoom=
{ "numberOfStudents":8,
  "chalkBoardsClean":false,
  "computers":
  {
    "computer1":"on",
    "computer2":"off"
  }
}

cleanChalkboards = () =>
{
 classRoom.chalkBoardsClean = true;
 console.log(classRoom)
}
console.log("Json.js loaded correctly.");
