import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  return (
    <Disclosure as='nav' className='bg-white border-b border-gray-200'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-purple-600 hover:bg-purple-100 hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600'>
              <span className='sr-only'>Abrir menu principal</span>
              <Bars3Icon
                aria-hidden='true'
                className='block h-6 w-6 group-data-[open]:hidden'
              />
              <XMarkIcon
                aria-hidden='true'
                className='hidden h-6 w-6 group-data-[open]:block'
              />
            </DisclosureButton>
          </div>

          <div className='flex flex-1 items-center justify-center'>
            <h1 className='text-purple-900 text-center text-3xl font-extrabold'>
              Hub de Automação
            </h1>
          </div>
        </div>
      </div>

      <DisclosurePanel className='sm:hidden'>
        <div className='space-y-1 px-2 pb-3 pt-2'></div>
      </DisclosurePanel>
    </Disclosure>
  );
}
