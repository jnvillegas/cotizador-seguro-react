import { useState, createContext } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero} from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca:'',
        year: '',
        plan:''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handlerChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value

        })
    }
    const cotizarSeguro = () => {
       // console.log('cotizando-...');
        //Una Base
        let resultado = 2000
        //Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        //Hay q restar el 3% por cada año
        resultado -= ((diferencia * 3) *resultado) / 100
        
        //Europeo 30%
        //Americano15%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        console.log(resultado);
        //Basico 20%
        //Completo  30%
        resultado *= calcularPlan(datos.plan)

        //Formatear Diner
        resultado = formatearDinero(resultado)
        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
        




      }
    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handlerChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
                {children}
        </CotizadorContext.Provider>
    )
}
export {
    CotizadorProvider
}
export default CotizadorContext