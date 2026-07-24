import { useLocale } from '@/store/locale';
import { useTemples } from '@/hooks/queries';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/Table';
import { Plus, Star } from 'lucide-react';
import { formatCompact } from '@/utils/format';

export function AdminTemples() {
  const { tx } = useLocale();
  const temples = useTemples();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2">{tx({ ta: 'கோயில்கள்', en: 'Temples' })}</h1>
          <p className="mt-1 text-body text-muted">
            {tx({ ta: 'பதிவு செய்யப்பட்ட கோயில்களை நிர்வகிக்கவும்.', en: 'Manage registered temples.' })}
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>{tx({ ta: 'புதிய கோயில்', en: 'Add temple' })}</Button>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>{tx({ ta: 'கோயில்', en: 'Temple' })}</TH>
            <TH>{tx({ ta: 'தெய்வம்', en: 'Deity' })}</TH>
            <TH>{tx({ ta: 'மாவட்டம்', en: 'District' })}</TH>
            <TH>{tx({ ta: 'மதிப்பீடு', en: 'Rating' })}</TH>
            <TH className="text-right">{tx({ ta: 'பின்தொடர்பவர்', en: 'Followers' })}</TH>
          </TR>
        </THead>
        <TBody>
          {temples.data?.map((tpl) => (
            <TR key={tpl.id}>
              <TD className="font-medium">{tx(tpl.name)}</TD>
              <TD className="text-muted">{tx(tpl.deity.name)}</TD>
              <TD className="text-muted">{tx(tpl.district)}</TD>
              <TD>
                <Badge tone="warning">
                  <Star className="h-3 w-3 fill-current" />
                  {tpl.rating}
                </Badge>
              </TD>
              <TD className="text-right tabular-nums text-muted">{formatCompact(tpl.followers)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
