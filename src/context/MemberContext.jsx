import {
  createContext,
  useState,
  useEffect,
} from "react";

export const MemberContext =
  createContext();

function MemberProvider({ children }) {
  const [members, setMembers] = useState(() => {
    const saved =
      localStorage.getItem("members");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "members",
      JSON.stringify(members)
    );
  }, [members]);

  const addMember = (member) => {
    setMembers([
      ...members,
      {
        ...member,
        id: Date.now(),
      },
    ]);
  };

  const deleteMember = (id) => {
    setMembers(
      members.filter(
        (member) => member.id !== id
      )
    );
  };

  const updateMember = (
    id,
    updatedMember
  ) => {
    setMembers(
      members.map((member) =>
        member.id === id
          ? {
              ...member,
              ...updatedMember,
            }
          : member
      )
    );
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        addMember,
        deleteMember,
        updateMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export default MemberProvider;