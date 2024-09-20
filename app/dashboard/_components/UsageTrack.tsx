"use client";

import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'; 
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';

function UsageTrack() {
    
    const {user} = useUser();
    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);

    useEffect(()=>{
        user && GetData();
    },[user])

    const GetData = async()=>{
        if (user && user.primaryEmailAddress?.emailAddress) {
            const result:HISTORY[] = await db
            .select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
            GetTotalUsage(result);
        }
    }



    const GetTotalUsage=(result:HISTORY[])=>{
        let total:number = 0;
        result.forEach(element =>{
            console.log(element.aiResponse);
            total += Number(element.aiResponse?.length);
        });
        setTotalUsage(total);
        console.log(total);
    }
  return (
    <div className='m-5'>
        <div className='bg-purple-600 text-white rounded-lg p-3'>
            <h2 className='font-medium'>
                Credits
            </h2>
            <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                <div 
                    className='h-2 bg-white rounded-full'
                    style={{
                        width:`${totalUsage/10000*100}%`
                    }}
                >

                    </div>
            </div>
            <h2 className='text-sm my-2'>
                {totalUsage}/10000 Credit Used
                </h2>
        </div>
        <Button 
            variant={'secondary'} 
            className='w-full my-3 text-purple-600'
            >
            Upgrade Plan
        </Button>
    </div>
  )
}

export default UsageTrack