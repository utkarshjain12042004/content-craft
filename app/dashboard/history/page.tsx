"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import Image from 'next/image';

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  templateName: string;
  templateIcon: string;
  createdBy: string;
  createdAt: string;
}

function History() {
  const { user } = useUser(); // Use the useUser hook to get the user object
  const [historyData, setHistoryData] = useState<HISTORY[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      if (user) { // Ensure the user is available before fetching data
        const data: HISTORY[] = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, user.primaryEmailAddress?.emailAddress));
        setHistoryData(data);
      }
    }

    fetchHistory(); // Fetch history when the component mounts or user changes
  }, [user]); // Depend on user so it runs again if the user object changes

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  const parseDate = (dateString: string) => {
    const parts = dateString.split('/');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD
  };
  

  return (
    <div className="bg-white m-5">
      <div className="p-10 flex flex-col justify-center items-start text-black">
        <h2 className="text-3xl font-bold">History</h2>
        <p>Search your previously generated AI content</p>
        
        {historyData.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 mt-5 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Template</th>
                <th className="px-4 py-2">AI Response</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Word Count</th>
                <th className="px-4 py-2">Copy</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => (
                <tr key={item.id} className="text-left border-b border-gray-200">
                  <td className="px-4 py-2 flex items-left">
                    <Image 
                      src={item.templateIcon} 
                      alt={item.templateName} 
                      width={30} // Set the width of the icon
                      height={30} // Set the height of the icon
                      className="mr-2" // Add margin to space the icon from the text
                    />
                    {item.templateName}
                  </td>
                  <td className="px-4 py-2 truncate max-w-xs">{item.aiResponse}</td>
                  <td className="px-4 py-2">{parseDate(item.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">{item.aiResponse.split(' ').length}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-white text-purple-600 px-4 py-1 rounded-lg hover:bg-gray-100 " // Change hover effect
                      onClick={() => copyToClipboard(item.aiResponse)}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mt-5">No history available.</p>
        )}
      </div>
    </div>
  );
  
}

export default History;
