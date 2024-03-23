import React, { useEffect, useState } from "react";
import BorderdSelect from "../FormInputs/BorderdSelect";
import { useGetInventory } from "../../Queries/InventoryQuery/InventoryQuery";

const InventorySearch = ({ onChange = () => {}, ...rest }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const { data, isFetched, isFetching } = useGetInventory({ search: search });
  useEffect(() => {
    setOptions(() =>
      data?.data?.data?.data?.map((e) => {
        return {
          label: e.item_code,
          value: e.item_code,
        };
      })
    );
  }, [search, isFetching, isFetched]);

  const loadOptions = (value) => {
    setSearch(value);
  };
  return (
    <div>
      <BorderdSelect
        {...rest}
        labelInValue={true}
        showSearch={true}
        filterOption={false}
        
        items={options}
        onSearch={loadOptions}
        onChange={(e) => {
          const datas = data?.data?.data?.data?.find((i) => {
            return i.item_code === e.value;
          });
          onChange(datas);
        }}
        placeholder="Select"
      />
    </div>
  );
};

export default InventorySearch;
