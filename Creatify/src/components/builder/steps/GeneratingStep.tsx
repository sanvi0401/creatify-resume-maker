import { motion } from 'framer-motion';
import { FormData } from '@/types';
import { cn } from '@/lib/utils';

interface GeneratingStepProps {
    formData: FormData;
}

export function GeneratingStep({ formData }: GeneratingStepProps) {
    const gradients = {
        modern: 'from-emerald-500 to-cyan-500',
        classic: 'from-purple-500 to-pink-500',
        minimal: 'from-amber-500 to-orange-500',
        creative: 'from-blue-500 to-indigo-500'
    };

    return (
        <div className="space-y-8">
            {/* Progress bar */}
            <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    className={cn(
                        "absolute inset-y-0 left-0",
                        "bg-gradient-to-r",
                        gradients[formData.template]
                    )}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                />
            </div>

            {/* Template and Career Type */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-2 bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-lg p-6 backdrop-blur-sm"
                >
                    <div className="text-sm text-zinc-400 mb-2">Selected Template</div>
                    <div className="text-xl font-semibold text-white capitalize">{formData.template}</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-2 bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-lg p-6 backdrop-blur-sm"
                >
                    <div className="text-sm text-zinc-400 mb-2">Career Path</div>
                    <div className="text-xl font-semibold text-white capitalize">
                        {formData.careerType === 'tech' ? 'Technology' : 'Other Industries'}
                    </div>
                </motion.div>
            </div>

            {/* Professional Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-lg p-6 backdrop-blur-sm"
            >
                <div className="text-sm text-zinc-400 mb-4">Professional Links</div>
                <div className="space-y-3">
                    {formData.careerType === 'tech' && formData.github && (
                        <div className="flex items-center space-x-2 text-emerald-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>GitHub: {formData.github}</span>
                        </div>
                    )}
                    {formData.careerType === 'non-tech' && formData.links.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2 text-purple-400">
                            <div className="w-2 h-2 rounded-full bg-purple-400" />
                            <span>{link}</span>
                        </div>
                    ))}
                    {formData.linkedin && (
                        <div className="flex items-center space-x-2 text-blue-400">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span>LinkedIn: {formData.linkedin}</span>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* About Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-lg p-6 backdrop-blur-sm"
            >
                <div className="text-sm text-zinc-400 mb-2">Professional Summary</div>
                <div className="text-white leading-relaxed">{formData.about}</div>
            </motion.div>

            {/* Status Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
            >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                        }}
                    />
                    <span>Creating your professional resume...</span>
                </div>
            </motion.div>
        </div>
    );
}