import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsPeopleFill } from "react-icons/bs";
import { User } from "../types";

interface Props {
  users: User[];
}

const DropdownMenu = ({ users }: Props) => {
  return (
    <Menu>
      <Menu.Button>
        <BsPeopleFill className="text-xl mr-5 sm:text-2xl" />
      </Menu.Button>
      <div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-30 mt-[34px] right-0 w-3/4 py-2 bg-yellow-400 max-w-[250px] border-4 border-black text-center sm:border-[6px] sm:mt-9">
            <h3 className="text-2xl font-semibold underline decoration-4">
              Active Users:
            </h3>
            {users.map((user, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <p
                    className={`${
                      active ? "bg-black text-white" : "bg-yellow-400"
                    } my-3 text-xl font-semibold`}
                  >
                    {user.name}
                  </p>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

export default DropdownMenu;
