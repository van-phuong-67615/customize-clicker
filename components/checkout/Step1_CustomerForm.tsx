'use client';
import * as React from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { sanitizePlainTextInput } from '@/lib/input-sanitization';

const schema = z.object({
  name: z.string().min(1, 'Vui lòng nhập họ tên'),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ'),
  city: z.string().min(1, 'Vui lòng nhập Tỉnh/TP'),
  district: z.string().min(1, 'Vui lòng nhập Quận/Huyện'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  notes: z.string().max(100).optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData?: FormData;
  onNext: (data: FormData) => void;
}

export function Step1_CustomerForm({ initialData, onNext }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useHookForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData
  });
  const notesLength = watch('notes')?.length ?? 0;
  const notesField = register('notes');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Họ và tên người nhận <span className="text-red-500">*</span></Label>
          <Input {...register('name')} placeholder="Nguyễn Văn A" error={!!errors.name} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Số điện thoại (có Zalo) <span className="text-red-500">*</span></Label>
          <Input {...register('phone')} placeholder="0988xxxxxx" error={!!errors.phone} />
          <p className="text-xs text-green-600">Có Zalo để shop gửi ảnh mockup trước khi ship</p>
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Tỉnh / Thành phố <span className="text-red-500">*</span></Label>
          <Input {...register('city')} placeholder="Hà Nội / TP.HCM / Đà Nẵng..." error={!!errors.city} />
        </div>
        <div className="space-y-1">
          <Label>Xã/Phường <span className="text-red-500">*</span></Label>
          <Input {...register('district')} placeholder="Ví dụ: Cầu Giấy, Hải Châu..." error={!!errors.district} />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Địa chỉ chi tiết (Số nhà, tên đường, thôn xóm) <span className="text-red-500">*</span></Label>
        <Input {...register('address')} placeholder="Số 12 ngõ 45 đường..." error={!!errors.address} />
      </div>

      <div className="space-y-1">
        <Label>Ghi chú đơn hàng & yêu cầu charm (Tùy chọn)</Label>
        <textarea 
          {...notesField}
          onChange={(event) => {
            event.currentTarget.value = sanitizePlainTextInput(event.currentTarget.value);
            notesField.onChange(event);
          }}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 min-h-[80px]"
          placeholder="Ví dụ: Gắn charm mèo Kuromi, gói quà..."
          maxLength={100}
        />
        <span
          className={notesLength === 100 ? 'text-red-500' : 'text-gray-700'}
          aria-live="polite"
        >
          {notesLength}/100
        </span>
      </div>

      <div className="pt-4">
        <Button type="submit" className='cursor-pointer' fullWidth>Tiếp tục: Phương thức thanh toán ➔</Button>
        <p className="text-center text-xs text-gray-500 mt-2 flex justify-center items-center gap-1 ">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Thông tin được bảo mật và chỉ dùng để gửi hàng
        </p>
      </div>
    </form>
  );
}
