import React, { useState } from 'react';
import axios from 'axios';
import { DatePicker, ConfigProvider, Select } from "antd";
import Router from 'next/router';

const SearchBar = () => {

    const [options, setOptions] = useState([])
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        // e.length>0?
        if(options.length==0){
            axios.get(process.env.NEXT_PUBLIC_GET_TOUR_SEARCH,{
                headers:{'search':search}
            }).then((x)=>{
                setOptions(x.data.result);
            })//:null
        }
    };

    const handleChange = (e) => {
        setSearch(e)
    };

  return (
    <div className='search-container'>
        <ConfigProvider theme={{token:{ borderRadius:'30px 0px 0px 30px' }}}>
            <Select
                showSearch
                placeholder={"Search Activities, Tours, Tickets"}
                style={{width:'70%', height:30, textAlign:'left'}}
                // value={search}
                onSearch={handleSearch}
                onChange={handleChange}
                dropdownStyle={{
                    maxHeight:100, borderRadius:0, backgroundColor:'white'
                }}
                options={options?.map((x)=>{
                    return{ label:x.title, value:x.slug }
                })}
                optionFilterProp="children"
                filterOption={(input, opt) =>
                    ((opt?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                    ((opt?.label) ?? '').toLowerCase().includes(input.toLowerCase())
                }
            />
        </ConfigProvider>
        <ConfigProvider theme={{token:{ borderRadius:0 }}}>
            <DatePicker style={{ height:30, textAlign:'left', width:'20%'}} size='small' />
        </ConfigProvider>
        <button className='search-btn' style={{width:'10%'}} onClick={()=>search?Router.push(`/product/${search}`):null}>{"Go"}</button>
    </div>
  )
}

export default React.memo(SearchBar)