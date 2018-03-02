let house = {
  "Rooms": {
    "SecondFloorRightRoom":{
      "NumberOfWindows":3,
      "Open":false,
      "GoodForGuest":false,
      "computer":
        {
          "GoodForGaming":true,
          "GoodForPublicUse":false
        }
    },
    "FirstFloorLeftRoom":{
      "NumberOfWindows":2,
      "Open":true,
      "GoodForGuest":true
    },
    "FirstFloorRightRoom":{
     "NumberOfWindows":2,
     "Open":true,
     "GoodForGuest":true
   },
    "MasterBedroom":{
      "NumberOfWindows":3,
      "Open":false,
      "GoodForGuest":false
    },
    "MasterBathroom":{
      "NumberOfWindows":1,
      "Open":true,
      "GoodForGuest":false,
      "Console":
       {
        "Name":"XBOXONE",
        "Off":false,
        "GoodForGaming":false,
        "GoodForPublicUse":false
      }
    }
  }
};

powerOnComputers = (computers) =>
{
 house.Rooms.SecondFloorRightRoom.computer.on = true;
  console.log("house");
}
