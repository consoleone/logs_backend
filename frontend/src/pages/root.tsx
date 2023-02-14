import { useEffect, useMemo, useState } from 'react';
import Input from '../components/Input';
import React from 'react';
import { getLogs } from '../api/logger';
import { useQuery } from '@tanstack/react-query';

function Th(
  props: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) {
  return (
    <th
      {...props}
      className={`border border-gray-400 p-2 text-left ${props.className}`}
    />
  );
}

function App() {
  const logs = useQuery({
    queryKey: ['logs'],
    queryFn: getLogs,
  });

  if (logs.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full p-1'>
      <div className='h-full px-10 py-5'>
        <div>
          <h2 className='text-2xl font-bold'>Logs</h2>
          <div className={`relative m-2 mx-auto w-full`}>
            <div
              className={`group flex items-center border-b-2 border-gray-400 py-3 pr-3 after:pointer-events-none
            after:absolute after:bottom-0 after:block after:h-full after:w-full after:translate-x-0
            after:scale-x-0 after:border-b-2 after:transition-all after:duration-300
            after:content-['']  focus-within:after:scale-x-100  focus-within:after:scale-y-100 focus-within:after:border-border-primary
            `}
            >
              <div className='search-icon px-3 text-gray-400 transition-colors duration-300 group-focus-within:text-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </div>
              <Input
                placeholder='Search Logs'
                className={`rounded-none border-0 bg-transparent px-0 py-0 text-primary focus:ring-0`}
                autoComplete='off'
                autoCorrect='off'
                aria-autocomplete='both'
                spellCheck='false'
                aria-controls='search-list'
                aria-activedescendant='search-item-0'
              />
            </div>
          </div>
        </div>
        <div className='h-full'>
          <div className='flex gap-2 text-gray-800 [&>*]:p-2'>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='peer absolute h-5 w-5 cursor-pointer opacity-0'
                />
                <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 border-gray-400 bg-white transition-colors duration-200 peer-checked:border-primary peer-checked:[&>*]:text-primary'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={3}
                    stroke='currentColor'
                    className='pointer-events-none h-3 w-3 text-white transition-colors duration-200'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className='w-28 text-center'>
              <span>Tag</span>
            </div>
            <div className='w-36'>
              <span>Container Name</span>
            </div>
            <div className='w-48 text-center'>
              <span>Timestamp</span>
            </div>
            {/* <div className=''>
              <span>Source</span>
            </div> */}
            <div className='flex-1 text-center'>
              <span>log</span>
            </div>
            <div className=''>
              <span>Actions</span>
            </div>
          </div>
          <div className=''>
            {logs.data?.map((log) => (
              <div
                key={log.id}
                className='my-2 flex gap-2 border-b border-gray-400 [&>*]:p-2'
              >
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='peer absolute h-4 w-4 cursor-pointer opacity-0'
                  />
                  <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 border-gray-400 bg-white transition-colors duration-200 peer-checked:border-primary peer-checked:[&>*]:text-primary'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={3}
                      stroke='currentColor'
                      className='pointer-events-none h-3 w-3 text-white transition-colors duration-200'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12.75l6 6 9-13.5'
                      />
                    </svg>
                  </div>
                </div>
                <div className='w-28'>
                  <div className=' h-full'>
                    <p className='truncate text-xs'>{log.tag}</p>
                  </div>
                </div>
                <div className='relative flex w-36 items-center justify-center'>
                  <div className='h-full min-w-full scale-x-100 rounded-3xl border border-purple-300 bg-purple-200 p-1.5 px-2 text-center transition-all duration-200 ease-in-out hover:min-w-fit hover:scale-105 hover:shadow-md hover:shadow-purple-300'>
                    <p className='truncate text-sm font-semibold text-purple-800'>
                      {log.data.container_name}
                    </p>
                  </div>
                </div>
                <div className='w-48'>
                  <span className='text-xs'>
                    {new Date(log.time).toISOString()}
                  </span>
                </div>
                {/* <div className=''>
                  <span className=''>Source</span>
                </div> */}
                <div className='flex-1'>
                  <span className=''>{log.data.log}</span>
                </div>
                <div className=''>
                  <span className=''>Actions</span>
                </div>
              </div>
            ))}
          </div>
          {/* <table className='w-full'>
            <thead className='bg-gray-300 text-primary'>
              <tr className=''>
                <Th className='w-8'></Th>
                <Th className=''>
                  <span>Tag</span>
                </Th>
                <Th className=''>Container Name</Th>
                <Th className=''>Timestamp</Th>
                <Th className=''>Source</Th>
                <Th className=''>log</Th>
                <Th className=''>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log) => (
                <tr key={log.id} className='block'>
                  <td className='w-5 px-2'>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        className='peer absolute h-5 w-5 cursor-pointer opacity-0'
                      />
                      <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 border-gray-400 bg-white transition-colors duration-200 peer-checked:border-primary peer-checked:[&>*]:text-primary'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={3}
                          stroke='currentColor'
                          className='pointer-events-none h-3 w-3 text-white transition-colors duration-200'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4.5 12.75l6 6 9-13.5'
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className='w-fit text-center'>
                    <span className='bg-cyan-600 p-2'>Tag</span>
                  </td>
                  <td className=''>{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}

export default App;
