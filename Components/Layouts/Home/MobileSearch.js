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
    <div className='home-slider-styles'>
        <h3 style={{fontFamily:'monospace'}} className='heading-main-mobile'>
            PEACELAND<span className='mx-2'></span>TRAVEL & TOURISM
        </h3>
        {show && <div className=''>
            <div className='search-container-mobile'>
                <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
                    <Select style={{width:'65%', height:30, textAlign:'left'}}
                        showSearch
                        size='small'
                        value={search}
                        placeholder={"Search Tours"}
                        onSearch={handleSearch}
                        onChange={handleChange}
                        dropdownStyle={{
                            maxHeight:100
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
        </div>}
    </div>
  )
}

export default React.memo(MobileSearch)