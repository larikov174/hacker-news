import { fromUnixTime, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const useConvertTime = (initData) => format(fromUnixTime(initData), 'dd MMMM yyyy, hh:mm:ss', { locale: enUS });

export default useConvertTime;