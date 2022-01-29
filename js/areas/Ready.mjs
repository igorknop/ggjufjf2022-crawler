import Area from "./Area.mjs";

export default class Ready extends Area {
  constructor(props) {
    super(props);
  }
  
  add(card){
      super.add(card);
      card.draggable = true;
  }
}
