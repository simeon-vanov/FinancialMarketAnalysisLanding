import { Box, Card, CircularProgress, TablePagination } from '@mui/material'
import { FC, useState, useRef, useEffect } from 'react'
import ScreenerTableFilters from './screener-table-filter'
import { IScreenerParameters, ScreenerInstrument } from './models'
import { fetchScreenerData } from './api'
import { PagedDto } from 'apis/models'
import ScreenerTable from './screener-table'
import { Scrollbar } from 'components/common/scrollbar'
import { Instrument } from 'types/options'

interface IScreenerProps {
  selectedInstrument: Instrument | undefined
  deselectInstrument: () => void
}

export const Screener: FC<IScreenerProps> = ({ selectedInstrument, deselectInstrument }) => {
  const [data, setData] = useState<PagedDto<ScreenerInstrument> | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(5)
  const [loading, setLoading] = useState<boolean>(false)
  const parametersRef = useRef<IScreenerParameters | null>(null)

  const reloadData = async (parameters: IScreenerParameters) => {
    if (parametersRef?.current === parameters) {
      return
    }

    setLoading(true)
    parametersRef.current = parameters
    setData(await fetchScreenerData({ ...parameters, page: pageNumber, pageSize }))
    setLoading(false)
  }

  useEffect(() => {
    if (parametersRef.current == null) return
    reloadData({ ...parametersRef.current })
  }, [pageNumber, pageSize])

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPageNumber(newPage)
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageSize(parseInt(event.target.value, 10))
    setPageNumber(0)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Card>
        <ScreenerTableFilters
          reloadData={reloadData}
          selectedInstrument={selectedInstrument}
          deselectInstrument={deselectInstrument}
        />
        <Scrollbar>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
              <CircularProgress />
            </Box>
          ) : (
            <ScreenerTable data={data?.items} />
          )}
          <TablePagination
            component='div'
            count={data?.totalRows ?? 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNumber}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Scrollbar>
      </Card>
    </Box>
  )
}
