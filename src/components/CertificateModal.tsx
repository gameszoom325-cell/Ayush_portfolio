import React, { useEffect } from 'react';
import { X, ShieldCheck, ExternalLink, Code2 } from 'lucide-react';
import { Achievement } from '../data/achievements';

interface CertificateModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (achievement) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-[2.5rem] glass-dossier p-6 sm:p-8 md:p-10 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col gap-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-label-mono-sm text-xs text-[#2dd4bf] uppercase tracking-widest font-semibold">
                {achievement.organization}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 text-[#2dd4bf] font-label-mono-sm text-[11px] uppercase">
                {achievement.badge}
              </span>
            </div>
            <h3 className="font-headline-sm text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {achievement.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Screenshot Preview */}
        {achievement.previewImage && (
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-inner">
            <img
              src={achievement.previewImage}
              alt={achievement.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Narrative Description */}
        <p className="font-body-md text-base text-white/80 leading-relaxed">
          {achievement.description}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-label-mono-sm text-xs">
          <div className="flex items-center gap-2 text-white/50">
            <ShieldCheck className="w-4 h-4 text-[#2dd4bf]" />
            <span>VERIFIED PROJECT RECORD • {achievement.year}</span>
          </div>

          <div className="flex items-center gap-3">
            {achievement.liveUrl && (
              <a
                href={achievement.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-label-mono-sm text-xs uppercase tracking-wider font-semibold hover:bg-[#C4C8D0] active:scale-95 transition-all duration-150"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {achievement.githubUrl && (
              <a
                href={achievement.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-white font-label-mono-sm text-xs uppercase tracking-wider hover:bg-white/15 active:scale-95 transition-all duration-150"
              >
                <span>GitHub</span>
                <Code2 className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
