"use client"

import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import Templates from '@/app/(data)/Templates';
import { TEMPLATE } from '@/app/dashboard/_components/TemplateListSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModel';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    'template-slug': string;  // Note: Use lowercase here as per dynamic folder name
  };
}

const CreateNewContent = ({ params }: Props) => {
  const slugFromParams: string = params['template-slug'];
  const selectedTemplate: TEMPLATE | undefined = Templates.find((item) => item.slug === slugFromParams);

  const [loading,setLoading] = useState(false);
  const [aiOutput,setAiOutput] = useState<string>('');

  const {user} = useUser();
  const router = useRouter();

  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);

  const generateAICountent = async(formData: any) => {
    if (totalUsage >= 10000) {
      // alert('You have reached the maximum usage limit. Please upgrade your plan to continue using the service.');
      router.push('/dashboard/billing');
      return;
    }
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    const result = await chatSession.sendMessage(finalAIPrompt);

    setAiOutput(result.response.text());

    await saveInDb(formData, selectedTemplate, result.response.text());
    setLoading(false);
  }

  const saveInDb = async(formData:any, selectedTemplate:TEMPLATE|undefined, aiResponse:string) => {
    {/*@ts-ignore*/}
    const result = await db.insert(AIOutput).values({ formData: formData,
      templateSlug: selectedTemplate?.slug,
      templateName: selectedTemplate?.name,
      templateIcon: selectedTemplate?.icon,
      aiResponse: aiResponse,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD/MM/YYYY'),
    });
  }

  return (
    <div className='p-5'>
      <Link href='/dashboard'>
        <Button className='bg-purple-600 text-white '> <ArrowLeft/> Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        {/* Form Sections */}
        <FormSection 
          selectedTemplate={selectedTemplate} 
          userFormInput={(v:any)=>generateAICountent(v)}
          loading={loading}
        />
        {/* Output Section */}
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};


export default CreateNewContent;
