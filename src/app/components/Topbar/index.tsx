'use client';
import React, { use, useEffect, useState } from 'react'
import { ProgressBar } from '../Progressbar';
import Image from 'next/image';
import bitcoin from '@/app/images/bitcoin-btc-logo.png';
import ethereum from '@/app/images/Ethereum.png';
import { Cryptobar } from '../CryptoBar';
import { useAppSelector } from '@/app/GlobalRedux/hooks';


export interface Data {
    data : {
    active_cryptocurrencies:              number;
    upcoming_icos:                        number;
    ongoing_icos:                         number;
    ended_icos:                           number;
    markets:                              number;
    total_market_cap:                     { [key: string]: number };
    total_volume:                         { [key: string]: number };
    market_cap_percentage:                { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
    updated_at:                           number;
    }
}

const initialData: Data = {
    data: {
      active_cryptocurrencies: 0,
      upcoming_icos: 0,
      ongoing_icos: 0,
      ended_icos: 0,
      markets: 0,
      total_market_cap: {},
      total_volume: {},
      market_cap_percentage: {},
      market_cap_change_percentage_24h_usd: 0,
      updated_at: 0
    }
  };


    


export const Topbar = () => {


    const [activeCoins, setActiveCoins] = useState(0);
    const [exhange, setExchange] = useState(0);
    const [marketCap, setMarketCap] = useState('');
    const [marketVolume, setMarketVolume] = useState('');
    const [btcPercentage, setBtcPercentage] = useState(0);
    const [ethPercentage, setEthPercentage] = useState(0);
    const currency = useAppSelector(state => state.currencyReducer);
    const [data, setData] = useState<Data>(initialData);

    const convertCurrencies = (newCurrency: string) => {
        let sign: string = '$';
        switch(newCurrency) {
            case 'gbp':
                sign = '£'
            break;
            case 'eur': 
                sign = '€'
            break;
            default: 
                sign = '$'
        }
        const cap = sign+ (+data?.data.total_market_cap[newCurrency]/1000000000000).toFixed(2) + 'T'
        setMarketCap(cap)
        const vol = sign + (+data.data.total_volume[newCurrency]/10000000000).toFixed(2) + 'B';
        setMarketVolume(vol);  
    }   


    const fetchGlobal = async () => {
        try {
            const url = 'https://api.coingecko.com/api/v3/global';
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        } catch (error){
            console.log(error);       
        }
    }
    useEffect(()=>{
        setActiveCoins(data.data.active_cryptocurrencies);
        setExchange(data.data.markets);
        convertCurrencies(currency.currency);
        setBtcPercentage(data.data.market_cap_percentage.btc);
        setEthPercentage(data.data.market_cap_percentage.eth);

    },[currency, data])
    

    useEffect(()=>{
        fetchGlobal();
    },[])

  return (
    <div className='w-full bg-purpleb text-white  flex justify-center items-center dark:bg-purplea'>
        <div className='flex m-2'>
            <div className='p-3'>Coins: {activeCoins}</div>
            <div className='p-3'>Exchange: {exhange}</div>
            <div className='p-3'>{marketCap}</div>
            <div className='p-3 flex'>
                <div>{marketVolume}</div>
                <div>
                    <ProgressBar 
                        percentage={20} 
                        color={'white'}
                        size={'w-12 h-2 '}
                        backgroundColor={'bg-zinc-500'}
                    />
                </div>
                <Cryptobar
                    currency={bitcoin}
                    percentage={btcPercentage}
                    color='#F7931A'
                />
                <Cryptobar
                    currency={ethereum}
                    percentage={ethPercentage}
                    color='#849DFF'
                />                
            </div>
        </div>
    </div>
  )
}
