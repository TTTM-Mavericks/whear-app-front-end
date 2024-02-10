// // ButtonContext.tsx
// import React, {
//     createContext,
//     useContext,
//     ReactNode,
//     Dispatch,
//     SetStateAction,
//     useState,
//   } from 'react';
  
//   interface ButtonContextType {
//     buttonPosition: { x: number; y: number };
//     updateButtonPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
//   }
  
//   const ButtonContext = createContext<ButtonContextType | undefined>(undefined);
  
//   interface ButtonProviderProps {
//     children: ReactNode;
//   }
  
//   export const ButtonProvider: React.FC<ButtonProviderProps> = ({ children }) => {
//     const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  
//     const updateButtonPosition = (
//       position: SetStateAction<{ x: number; y: number }>
//     ) => {
//       setButtonPosition((prevState) => ({
//         ...prevState,
//         ...(typeof position === 'function' ? position(prevState) : position),
//       }));
//     };
  
//     return (
//       <ButtonContext.Provider value={{ buttonPosition, updateButtonPosition }}>
//         {children}
//       </ButtonContext.Provider>
//     );
//   };
  
//   export const useButtonPosition = (): ButtonContextType => {
//     const context = useContext(ButtonContext);
  
//     if (!context) {
//       throw new Error('useButtonPosition must be used within a ButtonProvider');
//     }
  
//     return context;
//   };
  