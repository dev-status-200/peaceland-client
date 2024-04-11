import React from 'react';
import { FaMountainSun } from "react-icons/fa6";
import { LuFerrisWheel } from "react-icons/lu";
import { FaWaterLadder } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import Link from 'next/link';

const ActivityIcons = () => {
  return (
    <div className='p-5 text-center bg-white'>
        <div className='activity-container'>
            <Link href={"/activities?destination=&city=&category=Adventure"} style={{textDecoration:'none'}}>
                <div className='activity-icon'>
                    <FaMountainSun color='#a79ef5' />
                    <p>Adventure</p>
                </div>
            </Link>
            <Link href={"/activities?destination=&city=&category=Theme+Parks"} style={{textDecoration:'none'}}>
                <div className='activity-icon'>
                    <LuFerrisWheel color='#c65315' />
                    <p>Theme Parks</p>
                </div>
            </Link>
            <Link href={"/activities?destination=&city=&category=Water+Parks"} style={{textDecoration:'none'}}>
                <div className='activity-icon'>
                    <FaWaterLadder color='#1594c6' />
                    <p>Water Parks</p>
                </div>
            </Link>
            <Link href={"/activities?destination=&city=&category=Family+Fun"} style={{textDecoration:'none'}}>
                <div className='activity-icon'>
                    <MdFamilyRestroom color='#15c64d' />
                    <p>Family Fun</p>
                </div>
            </Link>
            <Link href={"/activities?destination=&city=&category=City+Tours"} style={{textDecoration:'none'}}>
                <div className='activity-icon'>
                    <GiModernCity color='#a61128' />
                    <p>City Tours</p>
                </div>
            </Link>
            <Link href={"/activities?destination=&city=&category=Luxury+Tours"} style={{textDecoration:'none'}}>
                <div className='activity-icon'>
                    <IoDiamond color='#615658' />
                    <p>Luxury Tours</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default ActivityIcons