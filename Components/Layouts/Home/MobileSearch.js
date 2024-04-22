import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, ConfigProvider, Select } from "antd";
import Router from 'next/router';
import { delay } from "../../../functions/delay"

const MobileSearch = () => {

    const [options, setOptions] = useState([])
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);

    const handleSearch = (e) => {
        // e.length>0?
        if(options.length==0){
            axios.get(process.env.NEXT_PUBLIC_GET_TOUR_SEARCH,{
                headers:{'search':search}
            }).then((x)=>{
                setOptions(x.data.result);
            })//:null
        }
    }

    const handleChange = (e) => {
        setSearch(e)
    }

    useEffect(() => {
      showHero()
    }, [])
    async function showHero(){
        await delay(500);
        setShow(true)
    }
    
  return (
    <div className=''>
    {show && 
    <div className='search-container-mobile my-3'>
      <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:'30px 0px 0px 30px' }}}>
        <Select style={{width:'65%', height:30, textAlign:'left'}}
          showSearch
          size='small'
          value={search}
          placeholder={"Search Tours"}
          onSearch={handleSearch}
          onChange={handleChange}
          dropdownStyle={{
              maxHeight:110, borderRadius:0, backgroundColor:'white'
          }}
          placement={"bottomRight"}
          options={options?.map((x)=>{
              return{ label:x.title, value:x.slug }
          })}
          optionFilterProp="children"
          filterOption={(input, option) =>
          ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
          ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </ConfigProvider>
      <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
        <DatePicker style={{ height:30, textAlign:'left', width:'20%'}} />
      </ConfigProvider>
      <button className='search-btn-mobile' style={{width:'15%'}} onClick={()=>search?Router.push(`/product/${search}`):null}>{"Go"}</button>
    </div>
    }
    </div>
  )
}

export default React.memo(MobileSearch)