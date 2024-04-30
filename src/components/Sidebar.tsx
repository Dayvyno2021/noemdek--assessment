import { useState, useCallback } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { NavElementsType, icons, navElements } from "../data";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import Modal from "./Modal";

const Sidebar = () => {

  const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false);
    //Handles the sliding in of the modal 

    const handleModal = () => {
      setOpenModal(prev=>!prev);
    }


  const location = useLocation()
  const pathname = location.pathname

  const [tabElement, setTabElement] = useState<NavElementsType[]>(navElements);

  const onOpenTab = useCallback((el:NavElementsType, ind: number) => {
    const clonedTab = structuredClone(navElements);
    el.open = !el.open;
    clonedTab[ind] = el;
    setTabElement(clonedTab);
  }, [])

  const router = () => {
    setOpenModal(false);
    navigate('/scheduling');
  }

  return (
    <>
        {
          openModal && (
          <Modal>
              <button style={{zIndex: '120'}} className="hamburger" onClick={()=>setOpenModal(false)}>
                <FaHamburger />
              </button>
                <div className="modal" >
                  <button className="modalBtn" onClick={()=>router()}>
                    Scheduling
                  </button>
                </div>
            </Modal>
          )
      }


      <button className="hamburger" onClick={()=>handleModal()}>
        <FaHamburger />
      </button>
      <nav className='sidebar'>
        <div className="sidebar-top">
          <div className="sidebar-top-user-image">
            <IoPersonOutline />
          </div>
          <div className="sidebar-top-user">
            <p className="sidebar-top-user-name">Okafor David</p>
            <p className="sidebar-top-user-portfolio">Admin</p>
          </div>
          <div className="sidebar-top-title p1">
            <MdHome className="sidebar-top-title-image icon" />
            <Link to="/" className="sidebar-top-title-title">
              <h3>Home</h3>
            </Link>
          </div>
        </div>
        <hr />
        <div className="sidebar-bottom">
          {
            tabElement.map((item, i) => (
              <div key={item.title}>
                <div onClick={() => onOpenTab(item, i)} className="sidebar-bottom-item">
                  <div className="sidebar-bottom-item-main">
                    {
                      item?.links?.includes(pathname.toLowerCase())? (<span className="white-rectangle" ></span>):('')
                    }
                    <span> {icons[i]} </span>
                    <p> {item.title} </p>
                  </div>
                  <FaCaretDown color="#fff" className={`${item.open && item.children.length? "rotate-180":''}`} />
                </div>
                {
                  item.open && item.children.length? (
                    <div className="sidebar-bottom-item-children">
                    {
                      item.children.map((child) => (
                        <Link key={Math.random()} to={`/${child.toLowerCase()}`} className={`${pathname === '/' + child.toLowerCase() ? "primary-btn" : 'btn'}`}>
                          {
                            item?.links?.includes(pathname.toLowerCase()) && pathname !== '/' + child.toLowerCase() ? (
                              <span className='white-rectangle' ></span>
                           ) :('')
                          } 
                          <span>{child}</span>
                        </Link>
                      ))
                    }
                  </div>
                  )
                  : ('')
                }
              </div>
            ))
          }
        </div>
      </nav>
    </>
  )
}

export default Sidebar