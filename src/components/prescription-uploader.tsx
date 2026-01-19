// @ts-nocheck
'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, FileText, Image as ImageIcon } from 'lucide-react';
import { getPrescriptionSummary } from '@/app/actions';
import Image from 'next/image';

export function PrescriptionUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      setFile(selectedFile);
      setSummary(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!preview) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a prescription image to upload.',
      });
      return;
    }
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await getPrescriptionSummary(preview);
      if (result.success) {
        setSummary(result.summary);
        toast({ title: 'Summary Generated Successfully' });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
      <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
        <Upload className="mr-2 h-4 w-4" />
        {file ? 'Change Image' : 'Select Image'}
      </Button>

      {preview && (
        <div className="relative w-full h-48 rounded-md border overflow-hidden">
          <Image src={preview} alt="Prescription preview" layout="fill" objectFit="contain" />
        </div>
      )}

      <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Summary...
          </>
        ) : (
          'Get AI Summary'
        )}
      </Button>

      {summary && (
        <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary"/>
                Prescription Summary
            </h3>
            <p className="text-sm whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}
