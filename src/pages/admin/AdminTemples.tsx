import { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { useDeities, useDistricts, useTemples } from '@/hooks/queries';
import type { Deity, LocalizedText } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/Table';
import { formatCompact } from '@/utils/format';

/** Minimal row shape for a freshly added temple — the admin quick-add form
 *  only captures what this table displays, not the full public Temple
 *  record (heritage, poojas, gallery, …), which onboarding would populate
 *  in a later step. */
interface NewTempleRow {
  id: string;
  name: LocalizedText;
  deity: Deity;
  district: LocalizedText;
  rating: number;
  followers: number;
}

export function AdminTemples() {
  const { tx } = useLocale();
  const temples = useTemples();
  const deities = useDeities();
  const districts = useDistricts();

  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState<NewTempleRow[]>([]);
  const [name, setName] = useState('');
  const [deityId, setDeityId] = useState('');
  const [districtId, setDistrictId] = useState('');

  const canSave = name.trim().length > 0 && deityId && districtId;

  const save = () => {
    const deity = deities.data?.find((d) => d.id === deityId);
    const district = districts.data?.find((d) => d.id === districtId);
    if (!deity || !district) return;
    setAdded((prev) => [
      { id: `local-${prev.length}-${name}`, name: { ta: name, en: name }, deity, district: district.name, rating: 4.5, followers: 0 },
      ...prev,
    ]);
    setName('');
    setDeityId('');
    setDistrictId('');
    setOpen(false);
  };

  const rows = [...added, ...(temples.data ?? [])];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2">{tx({ ta: 'கோயில்கள்', en: 'Temples' })}</h1>
          <p className="mt-1 text-body text-muted">
            {tx({ ta: 'பதிவு செய்யப்பட்ட கோயில்களை நிர்வகிக்கவும்.', en: 'Manage registered temples.' })}
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>
          {tx({ ta: 'புதிய கோயில்', en: 'Add temple' })}
        </Button>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>{tx({ ta: 'கோயில்', en: 'Temple' })}</TH>
            <TH>{tx({ ta: 'தெய்வம்', en: 'Deity' })}</TH>
            <TH>{tx({ ta: 'மாவட்டம்', en: 'District' })}</TH>
            <TH>{tx({ ta: 'மதிப்பீடு', en: 'Rating' })}</TH>
            <TH className="text-right">{tx({ ta: 'பின்தொடர்பவர்கள்', en: 'Followers' })}</TH>
          </TR>
        </THead>
        <TBody>
          {rows.map((tpl) => (
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

      <Dialog open={open} onClose={() => setOpen(false)} title={tx({ ta: 'புதிய கோயில் சேர்க்க', en: 'Add a new temple' })}>
        <div className="space-y-4">
          <Input
            label={tx({ ta: 'கோயில் பெயர்', en: 'Temple name' })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={tx({ ta: 'எ.கா. அருள்மிகு …', en: 'e.g. Arulmigu …' })}
          />
          <div>
            <label className="mb-1.5 block text-caption font-medium text-muted">
              {tx({ ta: 'தெய்வம்', en: 'Deity' })}
            </label>
            <select
              value={deityId}
              onChange={(e) => setDeityId(e.target.value)}
              className="h-11 w-full rounded-md border border-border bg-surface px-4 text-body text-text focus:border-primary"
            >
              <option value="">{tx({ ta: 'தேர்ந்தெடுக்கவும்', en: 'Select' })}</option>
              {deities.data?.map((d) => (
                <option key={d.id} value={d.id}>
                  {tx(d.name)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-caption font-medium text-muted">
              {tx({ ta: 'மாவட்டம்', en: 'District' })}
            </label>
            <select
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              className="h-11 w-full rounded-md border border-border bg-surface px-4 text-body text-text focus:border-primary"
            >
              <option value="">{tx({ ta: 'தேர்ந்தெடுக்கவும்', en: 'Select' })}</option>
              {districts.data?.map((d) => (
                <option key={d.id} value={d.id}>
                  {tx(d.name)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {tx({ ta: 'ரத்து செய்', en: 'Cancel' })}
            </Button>
            <Button onClick={save} disabled={!canSave}>
              {tx({ ta: 'சேர்', en: 'Add temple' })}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
