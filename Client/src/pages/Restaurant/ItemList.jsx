import { sampleItems } from "../../hooks/data";
import ItemContainer from "./ItemContainer";

export default function ItemsList(props) {
  const items = sampleItems[props.id];
  console.log("Items", items);
  return (
    <>
      List of Items
      {items.map((item, index) => {
        return (
          <ItemContainer
            key={item.id}
            id={item.id}
            name={item.name}
            desc={item.description}
            vegitarian={item.vegitarian}
            price={item.price}
          />
        );
      })}
    </>
  );
}
